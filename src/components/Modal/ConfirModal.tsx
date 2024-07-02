import React from "react";
import ModalComponent from "./ModalComponent";
import Button from "../Button/Button";
import { ModalLegacyProps, openModal } from "./modal.ctx";

interface Props extends ModalLegacyProps {
  message: string;
}

const ConfirModal: React.FC<Props> = (props) => {
  const { message, onCancel, onConfirm } = props;
  return (
    <ModalComponent
      as="confirm"
      body={message}
      title="Confirmation"
      size="compact"
      onClose={() => onCancel()}
      footer={
        <>
          <Button color="red" onClick={() => onCancel()}>
            Annuler
          </Button>
          <Button onClick={() => onConfirm(true)}> Confirmer </Button>
        </>
      }
    />
  );
};

export default ConfirModal;

export const openConfirmModal = async (props: { message: string }) => {
  return await openModal(ConfirModal, props);
};
