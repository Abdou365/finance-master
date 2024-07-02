import bem from "bem-ts";
import { compact } from "lodash";
import { useState } from "react";
import {
  FaEdit,
  FaFileImport,
  FaSave,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { openConfirmModal } from "../../components/Modal/ConfirModal";
import { formModal } from "../../components/Modal/FormModal";
import Button from "../../components/Button/Button";
import Empty from "../../components/Empty/Empty";
import { FieldType } from "../../components/Form/FormComponent";
import Table from "../../components/Table/Table";
import store from "../../store.tsx/store";
import { useItems } from "../../store.tsx/store.ctx";
import { useGetItemsCategory } from "../../store.tsx/useItems";
import { ItemType } from "../../types/item.type";
import ItemToolbar from "./ItemToolbar";
import "./Items.scss";
import { useItemsTable } from "./useItemsTable";
import { importModal } from "../../components/Modal/ImportModal/ImportModal";

export const itemCx = bem("item-group");

const useItemSchema = (): FieldType[] => {
  const { data: options } = useGetItemsCategory();
  return [
    {
      type: "text",
      name: "title",
      label: "Non de l'entrée",
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      format: "textarea",
    },
    {
      type: "date",
      name: "effect_date",
      label: "Date d'effet",
      format: "date",
    },
    {
      type: "number",
      name: "value",
      label: "Valeur",
    },
    {
      type: "select",
      name: "category",
      label: "Catégorie",
      options, // Options should be populated as needed
    },
    {
      type: "select",
      name: "isExpense",
      label: "Type d'entrée",
      options: [
        { value: true, label: "Dépense" },
        { value: false, label: "Revenu" },
      ],
    },
  ];
};

const Items = () => {
  const { items, updateItems, createItems, save, bulkDelete, deleteItem } =
    useItems();
  const itemFields = useItemSchema();
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
    const res = (await formModal({
      fields: itemFields,
      data: item,
      variant: "drawer",
    })) as ItemType | undefined;
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

  const handleImportItems = async () => {
    const res: Partial<ItemType>[] = await importModal({});
    console.log(res);

    res.map((item) => createItems(item));
  };

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
                label: "Importer",
                icon: FaFileImport,
                onClick: handleImportItems,
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
