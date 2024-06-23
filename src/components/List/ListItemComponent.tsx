import React from "react";
import { twMerge } from "tailwind-merge";

interface ListItemProps {
  children: React.ReactNode;
  className?: string;
}

const ListItemComponent: React.FC<ListItemProps> = ({
  children,
  className,
}) => {
  return (
    <li
      className={twMerge(
        "flex justify-between px-2 py-3 gap-3 lk--list-item",
        className
      )}
    >
      {children}
    </li>
  );
};

export default ListItemComponent;
