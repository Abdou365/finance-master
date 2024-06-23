import React from "react";
import "./List.scss";
import { twMerge } from "tailwind-merge";

interface ListProps {
  children: React.ReactNode;
  title?: string;
  celled?: boolean;
}

const ListComponent: React.FC<ListProps> = ({ children, title, celled }) => {
  return (
    <ul
      className={twMerge(
        "lk--list-container list-none p-0",
        celled && "lk--list-container-celled"
      )}
    >
      {title && <h3 className="lk--list-title">{title}</h3>} {children}
    </ul>
  );
};

export default ListComponent;
