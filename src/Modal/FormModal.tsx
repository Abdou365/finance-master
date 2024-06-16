import React, { useState } from "react";
import FormComponent, { FieldType } from "../components/Form/Form";
import Modal from "./Drawer";
import { ModalLegacyProps, openModal } from "./modal.ctx";

interface FormModalProps extends ModalLegacyProps {
  fields: FieldType[];
}

const FormModal: React.FC<FormModalProps> = (props) => {
  const { onCancel, onConfirm } = props;
  const [, setIsShowing] = useState(false);
  const [formState, setFormState] = useState({ title: "", description: "" });

  const onClose = async () => {
    setIsShowing(false);
    setTimeout(() => {
      onCancel();
    }, 300);
  };

  return (
    <Modal
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
          fields={props.fields}
        />
      }
    />
  );
};

export default FormModal;

export const formModal = async (props: { fields: FieldType[] }) => {
  return await openModal(FormModal, props);
};
