/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Component,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { uniqueId } from "lodash";

export const modalPromise = {
  current: (props: any) => {
    Promise.resolve(props);
  },
};

export const openModal = async (modal: any, props: any) => {
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
    console.log(props);

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
            id={m.modalId}
            {...m.props}
            onCancel={() => onCancel(m.modalId)}
            onConfirm={(data: any) => onConfirm(m.modalId, data)}
          />
        );
      })}
    </>
  );
};
