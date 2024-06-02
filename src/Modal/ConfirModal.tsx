import React from "react";
import Modal from "./Drawer";
import Button from "../components/Button/Button";
import { ModalLegacyProps, openModal } from "./modal.ctx";

interface Props extends ModalLegacyProps {
  message: string;
}

const ConfirModal: React.FC<Props> = (props) => {
  const { message, onCancel, onConfirm } = props;
  return (
    <Modal
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
