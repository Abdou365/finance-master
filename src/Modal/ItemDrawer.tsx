/* eslint-disable @typescript-eslint/no-explicit-any */
import { pick } from "lodash";
import React, { useState } from "react";
import FormComponent, { FieldType } from "../components/Form/FormComponent";
import { useGetItemsCategory } from "../store.tsx/useItems";
import { ItemType } from "../types/item.type";
import Modal from "./Drawer";
import { ModalLegacyProps, openModal } from "./modal.ctx";

interface ItemDrawerProps extends ModalLegacyProps, ItemType {}

const useSchema = (): FieldType[] => {
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

const ItemDrawer: React.FC<ItemDrawerProps> = (props) => {
  const { onCancel, onConfirm } = props;
  const schema = useSchema();

  const onClose = async () => {
    onCancel();
  };

  const initialData = pick(props, [
    "id",
    "title",
    "description",
    "date",
    "value",
    "category",
    "isExpense",
    "status",
  ]);

  const [formState, setFormState] = useState(initialData);

  return (
    <Modal
      onClose={onClose}
      title={props.title}
      as="drawer"
      size="medium"
      body={
        <FormComponent
          fields={schema}
          data={formState}
          onChange={({ name, value }) => {
            setFormState((obj) => ({ ...obj, [name]: value }));
          }}
        />
      }
      footer={
        <>
          <button className="btn-gray" onClick={onClose}>
            Annuler
          </button>
          <button className="btn-primary" onClick={() => onConfirm(formState)}>
            Valider
          </button>
        </>
      }
    />
  );
};

export default ItemDrawer;

/**
 * Opens the item drawer modal for editing an item.
 * @param props The item properties to be passed to the modal.
 * @returns A promise that resolves when the modal is closed.
 */
export const editItemDrawer = async (props: ItemType) => {
  return await openModal(ItemDrawer, props);
};
