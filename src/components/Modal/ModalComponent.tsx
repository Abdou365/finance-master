/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { twJoin, twMerge } from "tailwind-merge";

interface ModalProps {
  title?: string;
  closeButton?: boolean;
  onClose?: any;
  body: React.ReactNode;
  footer: React.ReactNode;
  children?: React.ReactNode;
  as?: "drawer" | "modal" | "confirm";
  size?: "full" | "compact" | "medium";
  celled?: boolean;
}

const ModalComponent: React.FC<ModalProps> = (props) => {
  const {
    onClose,
    title,
    body,
    footer,
    as = "drawer",
    closeButton,
    size = "medium",
    celled,
  } = props;
  const [isShowing, setIsShowing] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShowing(true);
    }, 300);
  }, [isShowing]);

  const drawerConatainer = twMerge(
    "fixed inset-0 flex  items-center justify-center ml-auto",
    size === "compact" && " sm:w-[500px]",
    size === "medium" && " sm:max-w-[800px]"
  );
  const modalContainer = twMerge(
    "fixed inset-0 flex max-h-full w-full items-center justify-center",
    size === "compact" && "h-fit max-w-[500px] m-auto",
    size === "medium" && " sm:h-fit sm:w-[800px] m-auto"
  );
  return (
    <Dialog
      open
      className="h-full w-full bg-black bg-opacity-80 top-0 right-0 absolute p-10 overflow-hidden"
      onClose={async () => {
        setIsShowing(false);
        setTimeout(() => {
          onClose();
        }, 300);
      }}
    >
      <div className={as === "drawer" ? drawerConatainer : modalContainer}>
        <Dialog.Panel
          className={twMerge(
            "bg-white dark:bg-primary-950  shadow-lg h-full w-full flex flex-col",
            ["confirm", "modal"].includes(as) && "rounded"
          )}
        >
          <Dialog.Title
            className={twMerge(
              `${
                celled && "border-b dark:border-b-primary-600"
              } p-3 flex justify-between`
            )}
          >
            <h2 className=" text-xl font-bold">{title} </h2>
            {closeButton && (
              <FaTimes onClick={onClose} className="btn-gray-link btn-small" />
            )}
          </Dialog.Title>
          <Dialog.Description as="div" className={"flex-1 overflow-auto p-3"}>
            {body}
          </Dialog.Description>
          <div
            className={twJoin(
              `${
                celled && "border-t  dark:border-t-primary-600"
              }  p-3 flex justify-between`
            )}
          >
            {footer}
          </div>
        </Dialog.Panel>
        {/* </Transition.Child> */}
      </div>
    </Dialog>
    // </Transition.Root>
  );
};

export default ModalComponent;
