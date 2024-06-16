import bem from "bem-ts";
import { compact } from "lodash";
import { useState } from "react";
import { FaEdit, FaSave, FaTimes, FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { openConfirmModal } from "../../Modal/ConfirModal";
import { editItemDrawer } from "../../Modal/ItemDrawer";
import Button from "../../components/Button/Button";
import Empty from "../../components/Empty/Empty";
import Table from "../../components/Table/Table";
import store from "../../store.tsx/store";
import { useItems } from "../../store.tsx/store.ctx";
import { ItemType } from "../../types/item.type";
import ItemToolbar from "./ItemToolbar";
import "./Items.scss";
import { useItemsTable } from "./useItemsTable";

export const itemCx = bem("item-group");

const Items = () => {
  const { items, updateItems, createItems, save, bulkDelete, deleteItem } =
    useItems();
  const { accountId } = useParams();
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});
  const { columns: tableColumns } = useItemsTable();
  const isFreeUser = store.isFreeUser();
  const handleCreate = () => {
    if (isFreeUser && items.length >= 100) {
      openConfirmModal({
        message:
          "You have reached the maximum number of items for the free plan",
      });
      return;
    }
    createItems({
      title: "",
      description: "",
      date: new Date().toISOString(),
      value: 0,
      category: "All",
      accountId: accountId || "",
      isExpense: false,
      status: "published",
      userId: store.user()?.id || "",
    });
  };

  const viewItem = async (item: ItemType) => {
    const res = (await editItemDrawer(item)) as ItemType | undefined;
    if (res) {
      updateItems({ ...item, ...res });
    }
  };

  const handleDeleteSelectedItems = async () => {
    if (!rowSelection) {
      return;
    }

    const confirm: boolean | undefined = await openConfirmModal({
      message: "Are you sure you want to delete the selected items?",
    });

    if (confirm) {
      const selectedItems = Object.keys(rowSelection).map(
        (index) => items[+index].id
      );

      bulkDelete(selectedItems);
      setRowSelection({});
    }
  };

  const handleDeleteItem = async (id: string) => {
    const confirm: boolean | undefined = await openConfirmModal({
      message: "Are you sure you want to delete this item?",
    });

    if (confirm) {
      deleteItem(id);
    }
  };

  if (items.length === 0) {
    return (
      <Empty
        title="No items found"
        description="Create a new item by clicking on the create button"
        action={<Button onClick={handleCreate}>Ajouter un mouvement</Button>}
      />
    );
  }
  const tableActionButtonStyles =
    "bg-gray-200 dark:bg-primary-600 dark:text-white p-1 rounded";

  const tableActions: import("../../components/Table/Table").TableAcion[] = [
    {
      component: (data) => (
        <div className=" space-x-2">
          <button
            onClick={() => viewItem(data)}
            className={tableActionButtonStyles}
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteItem(data.id)}
            className={tableActionButtonStyles}
          >
            <FaTimes />
          </button>
        </div>
      ),
      size: 40,
    },
  ];

  return (
    <>
      <div className={itemCx("filter")}>
        <div className=" w-full flex gap-2 ">
          <ItemToolbar
            classNames=" flex-1 justify-end"
            items={compact([
              {
                label: `${items.length} / 100`,
              },
              {
                label: "Sauvegarder",
                icon: FaSave,
                onClick: save,
              },
              {
                label: "Créer",
                icon: FaEdit,
                onClick: handleCreate,
              },
              {
                label: "Supprimer",
                icon: FaTrashAlt,
                onClick: handleDeleteSelectedItems,
              },
            ])}
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden dark:bg-primary-600 bg-gray-200 ">
        <Table
          selectable
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          columns={tableColumns}
          actions={tableActions}
          onChange={updateItems}
          tableData={items}
        />
      </div>
    </>
  );
};

export default Items;
