/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { uniqueId } from "lodash";
import React, { useRef, useState } from "react";

export const modalPromise = {
  current: (props: any) => {
    Promise.resolve(props);
  },
};

export const openModal: Promise<any> = async (modal: any, props: any) => {
  return await modalPromise.current({ ...props, modal });
};

export type ModalLegacyProps = {
  modalId: string;
  onCancel: () => void;
  onConfirm: (data?: any) => void;
};

export const ModalManager = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = useState<
    { modalId: string; modal: any; props: Record<string, any> }[]
  >([]);
  const resolveRef = useRef((v: unknown) => v);

  modalPromise.current = (props) => {
    const { modal, ...otherProps } = props;

    return new Promise((resolve) => {
      setModals((prev) => [
        ...prev,
        { modalId: uniqueId("modald"), props: otherProps, modal },
      ]);
      resolveRef.current = resolve;
    });
  };

  const onCancel = function (modalId: string): void {
    setModals((modal) => modal.filter((m) => m.modalId !== modalId));
    resolveRef.current(false);
  };
  const onConfirm = function (modalId: string, data?: any): void {
    setModals((modal) => modal.filter((m) => m.modalId !== modalId));
    resolveRef.current(data || true);
  };
  return (
    <>
      {children}
      {modals.map((m) => {
        const Component = m.modal;
        return (
          <Component
            key={m.modalId}
            modalId={m.modalId}
            {...m.props}
            onCancel={() => onCancel(m.modalId)}
            onConfirm={(data: any) => onConfirm(m.modalId, data)}
          />
        );
      })}
    </>
  );
};
