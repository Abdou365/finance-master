import React from "react";
import "./List.scss";

interface ListProps {
  children: React.ReactNode;
  title?: string;
}

const List: React.FC<ListProps> = ({ children, title }) => {
  return (
    <ul className="list-none p-0">
      {title && <h3 className=" font-bold p-2">{title}</h3>} {children}
    </ul>
  );
};

export default List;
