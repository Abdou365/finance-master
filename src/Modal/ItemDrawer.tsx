/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { pick } from "lodash";
import React, { useState } from "react";
import { ItemType } from "../types/item.type";
import Drawer from "./Drawer";
import { MyCustomWidget } from "./MyCustomWidget";
import { ModalLegacyProps, openModal } from "./modal.ctx";

interface ItemDrawerProps extends ModalLegacyProps, ItemType {}

const useSchema = (): RJSFSchema => {
  return {
    type: "object",
    required: [
      "id",
      "title",
      "description",
      "effect_date",
      "value",
      "category",
      "isExpense",
      "status",
    ],
    properties: {
      title: {
        type: "string",
        title: "Non de l'entré",
        description: "The title of the form entry.",
      },
      description: {
        type: "string",
        format: "textarea",
        description: "A detailed description of the form entry.",
      },
      date: {
        title: "Date",
        type: "string",
        format: "date",
      },
      value: {
        type: "number",
        description: "The numeric value associated with the form entry.",
      },
      category: {
        type: "string",
        enum: [],
        description: "The category of the form entry.",
      },
      isExpense: {
        type: "boolean",
        description:
          "A boolean flag indicating whether the form entry is an expense.",
      },
      status: {
        type: "string",
        enum: ["published", "deleted"],
        description: "The publication status of the form entry.",
      },
    },
  };
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
    <Drawer
      onClose={onClose}
      title={props.title}
      body={
        <Form
          schema={schema}
          validator={validator}
          fields={{ StringField: MyCustomWidget }}
          className="itemFormular"
          onChange={(e) => {
            setFormState(e.formData);
          }}
          formData={formState}
          children={null}
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

export const editItemDrawer = async (props: ItemType) => {
  return await openModal(ItemDrawer, props);
};
