import bem from "bem-ts";
import { compact, keyBy } from "lodash";
import { useState } from "react";
import {
  FaCalendar,
  FaEdit,
  FaFileImport,
  FaSave,
  FaTable,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { FieldType } from "../../components/Form/FormComponent";
import { openConfirmModal } from "../../components/Modal/ConfirModal";
import { formModal } from "../../components/Modal/FormModal";
import { importModal } from "../../components/Modal/ImportModal/ImportModal";
import Table, { TableAcion } from "../../components/Table/Table";
import store from "../../store.tsx/store";
import { useItemsStore } from "../../store.tsx/store.ctx";
import { useGetItemsCategory } from "../../store.tsx/useItems";
import { ItemType } from "../../types/item.type";
import ItemToolbar from "./ItemToolbar";
import "./Items.scss";
import { useItemsTable } from "./useItemsTable";
import Calendar from "../../components/Calendar/Calendar";
import { DragDropContext } from "@hello-pangea/dnd";

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
      name: "date",
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
      options:
        options?.map((category) => ({
          value: category,
          label: category,
        })) || [],
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
    useItemsStore();
  const itemFields = useItemSchema();
  const { accountId } = useParams();
  const [params, setParams] = useSearchParams({ view: "table" });
  const viewMode = params.get("view") || "table";
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});

  const { columns: tableColumns } = useItemsTable();
  const isFreeUser = store.isFreeUser();
  const handleCreate = (item?: Partial<ItemType>) => {
    if (isFreeUser && items.length >= 100) {
      openConfirmModal({
        message:
          "You have reached the maximum number of items for the free plan",
      });
      return;
    }
    createItems({
      title: "Nouvelle entrée",
      description: "Description",
      date: new Date().toISOString(),
      value: 1,
      createdAt: new Date().toISOString(),
      category: "All",
      accountId: accountId || "",
      isExpense: false,
      status: "published",
      userId: store.user()?.id || "",
      ...item,
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

  const handleDuplicate = async (item: ItemType) => {
    const { id, ...rest } = item;
    createItems(rest);
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
  const handleDeleteCalendarItem = async (item: ItemType) => {
    const confirm: boolean | undefined = await openConfirmModal({
      message: "Are you sure you want to delete this item?",
    });

    if (confirm) {
      deleteItem(item.id);
    }
  };

  const tableActionButtonStyles =
    "bg-gray-200 dark:bg-primary-600 dark:text-white p-1 rounded";

  const tableActions: TableAcion[] = [
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

  const calendarAction = [
    {
      label: "Voir",
      icon: FaEdit,
      onClick: viewItem,
    },
    {
      label: "Supprimer",
      icon: FaTrashAlt,
      onClick: handleDeleteCalendarItem,
    },
    {
      label: "Dupliquer",
      icon: FaEdit,
      onClick: handleDuplicate,
    },
  ];

  const handleImportItems = async () => {
    const res: any[] = await importModal({});
    res.map((item) => createItems(item));
  };

  const toggleViewMode = () => {
    setParams({ view: viewMode === "table" ? "calendar" : "table" });
  };

  const itemById = keyBy(items, "id");

  return (
    <DragDropContext
      onDragEnd={(p) => {
        const upadatedItem = {
          ...itemById[p.draggableId],
          date: new Date(p.destination?.droppableId as string).toISOString(),
        };
        updateItems(upadatedItem);
      }}
    >
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
                  onClick: () => {
                    save();
                  },
                },
                {
                  label: "Créer",
                  icon: FaEdit,
                  onClick: () => handleCreate(),
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
                {
                  label: "Vue",
                  icon: viewMode === "table" ? FaTable : FaCalendar,
                  onClick: toggleViewMode,
                },
              ])}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden ">
          {viewMode === "calendar" && (
            <Calendar
              items={items || []}
              actions={calendarAction}
              onChange={updateItems}
              onCreate={handleCreate}
            />
          )}
          {viewMode === "table" && (
            <Table
              selectable
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              columns={tableColumns}
              actions={tableActions}
              onChange={updateItems}
              tableData={items || []}
            />
          )}
        </div>
      </>
    </DragDropContext>
  );
};

export default Items;
