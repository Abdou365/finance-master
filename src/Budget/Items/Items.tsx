import bem from "bem-ts";
import { format } from "date-fns";
import { editItemDrawer } from "../../Modal/ItemDrawer";
import { useItems } from "../../store.tsx/store.ctx";
import { ItemType } from "../../types/item.type";
import "./Items.scss";
import Table from "./ItemsTable";
import { FaEdit } from "react-icons/fa";

export const itemCx = bem("item-group");

const Items = () => {
  const {
    items,
    categories,
    filter,
    updateItems,
    createItems,
    deleteSelectedItems,
  } = useItems();
  const handleCreate = () => {
    createItems({
      id: "",
      title: "",
      description: "",
      effect_date: format(new Date(), "yyyy-MM-dd"),
      value: 0,
      category: filter.view,
      isExpense: false,
      status: "published",
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
      {/* <div className={itemCx("category")}>
        {categories.map((category) => {
          return (
            <button
              className={
                filter.view === category
                  ? "nav-link active btn-primary"
                  : "nav-link active btn-primary-link"
              }
              aria-current="page"
              onClick={() => updateFilter(category)}
            >
              {category}
            </button>
          );
        })}
      </div> */}
      <div className={itemCx("filter")}>
        <div className="flex gap-2">
          <input
            type="text"
            className="input"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
        </div>
        <div className="">
          <button className="btn-primary btn-small" onClick={handleCreate}>
            Ajouter un item
          </button>
          <button type="button" className="btn-primary-link btn-small">
            Désactiver
          </button>
          <button
            type="button"
            className="btn-red btn-small"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        </div>
      </div>
      <div className={`${itemCx()} lk-scroll`}>
        {/* <div className={itemCx("body")}> */}
        {/* {items &&
            items.map((item) => {
              return <Item {...item} />;
            })} */}
        <Table
          columns={[
            {
              name: "category",
              label: "Caetegory",
              type: "select",
              options: categories,
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
                { name: "dépense", value: true },
                { name: "encaissement", value: false },
              ],
              size: 40,
            },
            {
              name: "effect_date",
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
          selectable
          onChange={updateItems}
          tableData={items}
        />
        {/* </div> */}
      </div>
    </>
  );
};

export default Items;
