/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Listbox, Transition } from "@headlessui/react";
import Form from "@rjsf/core";
import { FieldProps, RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { pick } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useItems } from "../store.tsx/store.ctx";
import { ItemType } from "../types/item.type";
import { ModalLegacyProps, openModal } from "./modal.ctx";

interface ItemDrawerProps extends ModalLegacyProps, ItemType {}

const useSchema = (): RJSFSchema => {
  const { categories } = useItems();
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
        enum: categories,
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

export const MyCustomWidget = (props: FieldProps) => {
  // const [inputData, setInputData] = useState(props.formData);
  const handleChange = (data: any) => {
    props.onChange(data);
  };
  if (props.schema.enum) {
    return (
      <Listbox>
        <Listbox.Button
          className={" border px-2 py-1  w-full bg-white rounded"}
        >
          {props.formData}
        </Listbox.Button>
        <Listbox.Options
          className={
            " border absolute p-1 bg-white z-10 cursor-pointer rounded shadow"
          }
        >
          {props.schema.enum.map((value) => (
            <Listbox.Option
              className={
                "py-1 px-2 hover:bg-slate-100 active:bg-primary-100 w-full"
              }
              key={value}
              onClick={() => {
                handleChange(value);
              }}
            >
              {value}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    );
  }

  if (props.schema.type === "string" && props.schema.format === "date") {
    console.log({ form: props.formData });

    return (
      <ReactDatePicker
        wrapperClassName="w-full"
        required={props.required}
        readOnly={props.readonly}
        selected={props.formData}
        dateFormat="YYYY-MM-dd"
        dateFormatCalendar="YYYY-MM-dd"
        onChange={(date) => handleChange(date)}
        value={props.formData}
      />
    );
  }

  if (props.schema.type === "number") {
    return (
      <input
        required={props.required}
        readOnly={props.readonly}
        type="number"
        onChange={(e) => handleChange(e.target.value)}
        value={props.formData}
      />
    );
  }

  return (
    <input
      required={props.required}
      readOnly={props.readonly}
      type="text"
      onChange={(e) => handleChange(e.target.value)}
      value={props.formData}
    />
  );
};

const ItemDrawer: React.FC<ItemDrawerProps> = (props) => {
  const { onCancel, onConfirm } = props;
  const [isShowing, setIsShowing] = useState(false);
  const schema = useSchema();
  useEffect(() => {
    setTimeout(() => {
      setIsShowing(true);
    }, 300);
  }, [isShowing]);

  const onClose = async () => {
    setIsShowing(false);
    setTimeout(() => {
      onCancel();
    }, 300);
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
    <Dialog
      open
      className="z-50 h-full w-full bg-primary-950 bg-opacity-50  top-0 right-0 absolute "
      onClose={onClose}
    >
      <div className="fixed inset-0 flex w-[500px] items-center justify-center ml-auto">
        <Transition
          as={Fragment}
          show={isShowing}
          enter="transform transition duration-400"
          enterFrom="opacity-0 translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="transform transition duration-200 ease-in-out"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-full"
        >
          <Dialog.Panel
            className={"bg-white  shadow-lg h-full w-full flex flex-col"}
          >
            <Dialog.Title className="border-b p-3 flex justify-between">
              <h2 className=" text-xl font-bold">{props.title} </h2>
              <button onClick={onClose} className="btn-gray-outlined btn-small">
                X Close
              </button>
            </Dialog.Title>
            <Dialog.Description
              as="div"
              className={"flex-1 bg-gray-50 overflow-auto p-3"}
            >
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
            </Dialog.Description>

            <div className="border-t p-3 flex justify-between">
              <button className="btn-gray" onClick={onClose}>
                Annuler
              </button>
              <button
                className="btn-primary"
                onClick={() => onConfirm(formState)}
              >
                Valider
              </button>
            </div>
          </Dialog.Panel>
        </Transition>
      </div>
    </Dialog>
  );
};

export default ItemDrawer;

export const editItemDrawer = async (props: ItemType) => {
  return await openModal(ItemDrawer, props);
};
