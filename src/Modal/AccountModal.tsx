import { Dialog, Transition } from "@headlessui/react";
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import React, { Fragment, useEffect, useState } from "react";
import { MyCustomWidget } from "./ItemDrawer";
import { ModalLegacyProps, openModal } from "./modal.ctx";
import Form from "@rjsf/core";
import { FaTimes } from "react-icons/fa";

const useSchema = (): RJSFSchema => {
  return {
    type: "object",
    required: [],
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
    },
  };
};

interface AccountModalProps extends ModalLegacyProps {}

const AccountModal: React.FC<AccountModalProps> = (props) => {
  const { onCancel, onConfirm } = props;
  const [isShowing, setIsShowing] = useState(false);
  const [formState, setFormState] = useState({ title: "", description: "" });

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

  return (
    <Dialog
      open
      className="z-50 h-full w-full bg-primary-950 bg-opacity-50  top-0 right-0 absolute "
      onClose={onClose}
    >
      <div className="fixed inset-0 flex max-h-full w-[500px] items-center justify-center m-auto">
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
            className={"bg-white rounded shadow-lg  w-full flex flex-col"}
          >
            <Dialog.Title className="border-b p-3 flex justify-between">
              <h2 className=" text-xl font-bold">title </h2>
              <FaTimes onClick={onClose} className=" cursor-pointer" />
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

            <div className="border-t p-3 flex gap-3 justify-end">
              <button className="btn-gray-outlined" onClick={onClose}>
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

export default AccountModal;

export const accountModal = async () => {
  return await openModal(AccountModal, {});
};
