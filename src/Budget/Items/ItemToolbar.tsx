import React from "react";
import { FaIcons } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

type Props = {
  items: {
    icon?: IconType;
    label?: string;
    onClick?: () => void;
  }[];
  orientation?: "horizontal" | "vertical";
  classNames?: string;
};

const ItemToolbar: React.FC<Props> = ({
  items,
  orientation = "horizontal",
  classNames,
}) => {
  return (
    <ul
      className={twMerge(
        " flex border-b dark:border-primary-600  dark:text-primary-100",
        orientation === "vertical" && "flex-col",
        classNames
      )}
    >
      {items.map((item, index) => {
        const Icon = item.icon || FaIcons;
        return (
          <li
            className="flex place-items-center cursor-pointer p-2 gap-2 border dark:border-primary-600 hover:bg-gray-100 dark:hover:bg-primary-900  dark:text-primary-100 "
            onClick={item.onClick}
            key={index}
          >
            {item.icon && <Icon className="m-auto" />}
            {item.label && <span>{item.label}</span>}
          </li>
        );
      })}
    </ul>
  );
};

export default ItemToolbar;
