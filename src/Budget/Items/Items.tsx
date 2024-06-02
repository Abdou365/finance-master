import bem from "bem-ts";
import { FaEdit, FaSave, FaTrashAlt } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { editItemDrawer } from "../../Modal/ItemDrawer";
import store from "../../store.tsx/store";
import { useItems } from "../../store.tsx/store.ctx";
import { useGetItemsCategory } from "../../store.tsx/useItems";
import { ItemType } from "../../types/item.type";
import { formatOptions } from "../../utils/formatOptions";
import "./Items.scss";
import Table from "./ItemsTable";
import Pagination from "../../components/Pagination/Pagination";
import Wait from "../../components/Wait/Wait";
import Button from "../../components/Button/Button";

export const itemCx = bem("item-group");

const Items = () => {
  const {
    items,
    pageCount,
    updateItems,
    createItems,
    deleteSelectedItems,
    save,
  } = useItems();
  const { accountId } = useParams();
  const { data: options } = useGetItemsCategory();
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

  const handleDelete = () => {
    deleteSelectedItems();
  };

  if (!items) {
    return <Wait />;
  }

  return (
    <>
      <div className={itemCx("filter")}>
        <div className="ml-auto flex gap-2">
          <Button className="btn-primary btn-small" onClick={handleCreate}>
            Ajouter un item
          </Button>
          <Button
            color="red"
            className="btn-red btn-small"
            onClick={handleDelete}
          >
            <FaTrashAlt />
          </Button>
          <Button className="btn-primary btn-small" onClick={save}>
            <FaSave />
          </Button>
        </div>
      </div>
      <div className={`${itemCx()} lk-scroll`}>
        <Table
          columns={[
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
          ]}
          actions={[
            {
              component: (data) => (
                <button
                  onClick={() => viewItem(data)}
                  className="bg-gray-200 dark:bg-primary-600 dark:text-white p-1 rounded"
                >
                  <FaEdit />
                </button>
              ),
              size: 40,
            },
          ]}
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
          }}
        />
      </div>
    </>
  );
};

export default Items;
