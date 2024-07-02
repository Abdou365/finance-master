import React from "react";
import { editItemDrawer } from "../../components/Modal/ItemDrawer";
import { useItems } from "../../store.tsx/store.ctx";
import { ItemType } from "../../types/item.type";
import ItemInput from "./ItemInput";
import { itemCx } from "./Items";

export const Item: React.FC<ItemType> = (props) => {
  const { updateItems } = useItems();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.name === "value" ? +e.target.value : e.target.value;
    updateItems({ ...props, [e.target.name]: value });
  };

  const viewItem = async () => {
    const res = (await editItemDrawer(props)) as ItemType | undefined;
    if (res) {
      updateItems({ ...props, ...res });
    }
  };
  return (
    <div className={itemCx("row")}>
      <div>
        <input
          className="lk-input--checkbox"
          type="checkbox"
          checked={selectedItem.includes(props.id)}
          onClick={handleChecked}
        />
      </div>
      <ItemInput
        type="text"
        name="title"
        onBlur={handleChange}
        defaultValue={props.title}
      />

      <ItemInput
        className="w-full text-sm"
        type="text"
        name="description"
        onBlur={handleChange}
        defaultValue={props.description}
      />
      <div className=" w-64 m-0 h-full">{props.created_at}</div>
      <ItemInput
        type="number"
        min={0}
        name="value"
        className={
          props.isExpense
            ? "lk-text-negative outline-1 outline-primary-400 w-20 bg-transparent text-right text-sm"
            : "lk-text-positive outline-1 outline-primary-400 w-20 bg-transparent text-right text-sm"
        }
        onBlur={handleChange}
        defaultValue={props.value}
      />
      <div>
        <button
          onClick={viewItem}
          type="button"
          className="btn-primary-outlined btn-small"
        >
          Edit
        </button>
      </div>
    </div>
  );
};
