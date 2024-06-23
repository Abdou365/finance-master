import React from "react";
import MenuItem, { MenuItemProps } from "./MenuItem";
import BoxComponent from "../Box/BoxComponent";

interface VerticalMenuProps {
  items: MenuItemProps[];
}

const VerticalMenu: React.FC<VerticalMenuProps> = ({ items }) => {
  return (
    <BoxComponent className="space-y-1 w-60 max-w-full shadow">
      {items.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </BoxComponent>
  );
};

export default VerticalMenu;
