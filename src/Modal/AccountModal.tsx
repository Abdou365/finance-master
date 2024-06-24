import { Dialog, Transition } from "@headlessui/react";
import { RJSFSchema } from "@rjsf/utils";
import React, { Fragment, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import FormComponent from "../components/Form/FormComponent";
import { ModalLegacyProps, openModal } from "./modal.ctx";
import ModalComponent from "./ModalComponent";

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
    // <Dialog
    //   open
    //   className="z-50 h-full w-full bg-primary-950 bg-opacity-50  top-0 right-0 absolute "
    //   onClose={onClose}
    // >
    //   <div className="fixed inset-0 flex max-h-full w-[500px] items-center justify-center m-auto">
    //     <Transition
    //       as={Fragment}
    //       show={isShowing}
    //       enter="transform transition duration-400"
    //       enterFrom="opacity-0 translate-x-full"
    //       enterTo="opacity-100 translate-x-0"
    //       leave="transform transition duration-200 ease-in-out"
    //       leaveFrom="opacity-100 translate-x-0"
    //       leaveTo="opacity-0 translate-x-full"
    //     >
    //       <Dialog.Panel
    //         className={
    //           "bg-white dark:bg-primary-900 rounded shadow-lg  w-full flex flex-col"
    //         }
    //       >
    //         <Dialog.Title className=" dark:border-b-primary-600  border-b p-3 flex justify-between">
    //           <h2 className=" text-xl font-bold">title </h2>
    //           <FaTimes onClick={onClose} className=" cursor-pointer" />
    //         </Dialog.Title>
    //         <Dialog.Description
    //           as="div"
    //           className={
    //             "flex-1 bg-gray-50 dark:bg-primary-800 overflow-auto p-3"
    //           }
    //         >
    //           <FormComponent
    //             data={formState}
    //             onChange={({ name, value }) => {
    //               setFormState((obj) => ({ ...obj, [name]: value }));
    //             }}
    //             fields={[
    //               {
    //                 type: "string",
    //                 name: "title",
    //                 label: "Non de l'entré",
    //                 description: "The title of the form entry.",
    //               },
    //               {
    //                 type: "string",
    //                 format: "textarea",
    //                 name: "description",
    //                 label: "A detailed description of the form entry.",
    //               },
    //             ]}
    //           />
    //         </Dialog.Description>

    //         <div className="border-t dark:border-t-primary-600 p-3 flex gap-3 justify-end">
    //           <button className="btn-gray-outlined" onClick={onClose}>
    //             Annuler
    //           </button>
    //           <button
    //             className="btn-primary"
    //             onClick={() => onConfirm(formState)}
    //           >
    //             Valider
    //           </button>
    //         </div>
    //       </Dialog.Panel>
    //     </Transition>
    //   </div>
    // </Dialog>
    <ModalComponent
      as="modal"
      compact
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
      title="Créer un compte"
      onClose={onClose}
      closeButton
      body={
        <FormComponent
          data={formState}
          onChange={({ name, value }) => {
            setFormState((obj) => ({ ...obj, [name]: value }));
          }}
          fields={[
            {
              type: "string",
              name: "title",
              label: "Non de l'entré",
              description: "The title of the form entry.",
            },
            {
              type: "string",
              format: "textarea",
              name: "description",
              label: "A detailed description of the form entry.",
            },
          ]}
        />
      }
    />
  );
};

export default AccountModal;

export const accountModal = async () => {
  return await openModal(AccountModal, {});
};
