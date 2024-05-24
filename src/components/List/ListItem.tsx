import React from "react";

interface ListItemProps {
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return <li className="flex justify-between px-2 py-3 gap-3">{children}</li>;
};

export default ListItem;
