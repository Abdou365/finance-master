/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface Drawer {
  title?: string;
  closeButton?: boolean;
  onClose?: any;
  body: React.ReactNode;
  footer: React.ReactNode;
  children?: React.ReactNode;
}

const Drawer: React.FC<Drawer> = (props) => {
  const { onClose, title, body, footer } = props;
  const [isShowing, setIsShowing] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShowing(true);
    }, 300);
  }, [isShowing]);

  return (
    <Dialog
      open
      className="z-50 h-full w-full bg-primary-950 bg-opacity-50  top-0 right-0 absolute "
      onClose={async () => {
        setIsShowing(false);
        setTimeout(() => {}, 300);
        onClose();
      }}
    >
      <div className="fixed inset-0 flex lg:w-[500px] items-center justify-center ml-auto">
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
              <h2 className=" text-xl font-bold">{title} </h2>
              <FaTimes onClick={onClose} className="btn-gray-link btn-small" />
            </Dialog.Title>
            <Dialog.Description
              as="div"
              className={"flex-1 bg-gray-50 overflow-auto p-3"}
            >
              {body}
            </Dialog.Description>
            <div className="border-t p-3 flex justify-between">{footer} </div>
          </Dialog.Panel>
        </Transition>
      </div>
    </Dialog>
  );
};

export default Drawer;
