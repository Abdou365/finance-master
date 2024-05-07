import { Menu, Popover } from "@headlessui/react";
import React from "react";
import { FaEllipsisH } from "react-icons/fa";

type Props = {};

const TableAction = (props: Props) => {
  return (
    <>
      <button className=" bg-gray-100 p-1 rounded active:bg-gray-200">
        <FaEllipsisH />
      </button>
    </>
  );
};

export default TableAction;
