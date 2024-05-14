import bem from "bem-ts";
import { FaEdit, FaSave, FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { editItemDrawer } from "../../Modal/ItemDrawer";
import store from "../../store.tsx/store";
import { useItems } from "../../store.tsx/store.ctx";
import { ItemType } from "../../types/item.type";
import "./Items.scss";
import Table from "./ItemsTable";

export const itemCx = bem("item-group");

const Items = () => {
  const {
    items,

    updateItems,
    createItems,
    deleteSelectedItems,
    save,
  } = useItems();
  const { accountId } = useParams();
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
  return (
    <>
      <div className={itemCx("filter")}>
        <div className="ml-auto flex gap-2">
          <button className="btn-primary btn-small" onClick={handleCreate}>
            Ajouter un item
          </button>
          <button
            type="button"
            className="btn-red btn-small"
            onClick={handleDelete}
          >
            <FaTrashAlt />
          </button>
          <button className="btn-primary btn-small" onClick={save}>
            <FaSave />
          </button>
        </div>
      </div>
      <div className={`${itemCx()} lk-scroll`}>
        <Table
          columns={[
            {
              name: "category",
              label: "Caetegory",
              type: "select",
              options: ["All", "Financement", "Facture", "Prime", "Salaire"],
              dtatype: "string",
              size: 50,
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
              size: 40,
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
                  className="bg-gray-200 p-1 rounded"
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
    </>
  );
};

export default Items;
