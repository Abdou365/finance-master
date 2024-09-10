import React, { useState } from "react";
import FormComponent, { FieldType } from "../Form/FormComponent";
import ModalComponent from "./ModalComponent";
import { ModalLegacyProps, openModal } from "./modal.ctx";

type Props = {
  fields: FieldType[];
  title?: string;
  data?: any;
  variant?: "modal" | "drawer";
  size?: "full" | "compact" | "medium";
};

interface FormModalProps extends ModalLegacyProps, Props {}

const FormModal: React.FC<FormModalProps> = (props) => {
  const {
    onCancel,
    onConfirm,
    variant = "modal",
    size = "medium",
    title,
    data,
  } = props;
  const [, setIsShowing] = useState(false);
  const [formState, setFormState] = useState(data);

  const onClose = async () => {
    setIsShowing(false);
    setTimeout(() => {
      onCancel();
    }, 300);
  };

  return (
    <ModalComponent
      as={variant}
      size={size}
      celled
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
      title={title || "Modal"}
      onClose={onClose}
      closeButton
      body={
        <FormComponent
          data={formState}
          onChange={({ name, value }) => {
            setFormState((obj: any) => ({ ...obj, [name]: value }));
          }}
          fields={props.fields}
        />
      }
    />
  );
};

export default FormModal;

export const formModal = async (props: Props) => {
  return await openModal(FormModal, props);
};
