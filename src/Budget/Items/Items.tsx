import bem from "bem-ts";
import { isEmpty } from "lodash";
import { useState } from "react";
import { FaEdit, FaSave, FaTimes, FaTrashAlt } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { openConfirmModal } from "../../Modal/ConfirModal";
import { editItemDrawer } from "../../Modal/ItemDrawer";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import Table, { TableColumnType } from "../../components/Table/Table";
import Wait from "../../components/Wait/Wait";
import store from "../../store.tsx/store";
import { useItems } from "../../store.tsx/store.ctx";
import { useGetItemsCategory } from "../../store.tsx/useItems";
import { ItemType } from "../../types/item.type";
import { formatOptions } from "../../utils/formatOptions";
import "./Items.scss";
import Empty from "../../components/Empty/Empty";

export const itemCx = bem("item-group");

const Items = () => {
  const {
    items,
    pageCount,
    updateItems,
    createItems,
    save,
    bulkDelete,
    deleteItem,
  } = useItems();
  const { accountId } = useParams();
  const { data: options } = useGetItemsCategory();
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const handleCreate = () => {
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

  if (!items) {
    return <Wait />;
  }

  const tableActionButtonStyles =
    "bg-gray-200 dark:bg-primary-600 dark:text-white p-1 rounded";
  const tableColumns: TableColumnType[] = [
    {
      name: "category",
      label: "Caetegory",
      type: "select",
      options: formatOptions(options || []),
      dtatype: "string",
      size: 50,
      creatable: true,
    },
    {
      name: "title",
      label: "Titre",
      type: "text",
      dtatype: "string",
    },
    {
      name: "isExpense",
      label: "nature",
      type: "select",
      dtatype: "boolean",
      options: [
        { label: "dépense", value: true },
        { label: "encaissement", value: false },
      ],
      size: 70,
    },
    {
      name: "date",
      label: "Date de mise En effet",
      type: "date",
      dtatype: "date",
      size: 60,
    },
    {
      name: "value",
      label: "Montant",
      type: "number",
      dtatype: "integer",
      size: 40,
    },
  ];
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
        <div className="ml-auto flex gap-2">
          <Button className="btn-primary btn-small" onClick={handleCreate}>
            Ajouter un item
          </Button>
          {!isEmpty(rowSelection) && (
            <Button
              color="red"
              className="btn-red btn-small"
              onClick={handleDeleteSelectedItems}
            >
              <FaTrashAlt />
            </Button>
          )}
          <Button className="btn-primary btn-small" onClick={save}>
            <FaSave />
          </Button>
        </div>
      </div>
      {items.length > 0 ? (
        <>
          <div className={`${itemCx()} lk-scroll`}>
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
          <div className="mb-2">
            <Pagination
              currentPage={+(searchParams.get("page") || 0)}
              totalPages={pageCount}
              onPageChange={(page) => {
                setSearchParams({ page: page.toString() });
                setRowSelection({});
              }}
            />
          </div>
        </>
      ) : (
        <div className=" flex-1 pb-4">
          <Empty />
        </div>
      )}
    </>
  );
};

export default Items;
