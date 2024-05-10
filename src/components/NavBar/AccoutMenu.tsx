import { Menu } from "@headlessui/react";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAccountNav } from "../../store.tsx/useAccount";

const AccoutMenu: React.FC = () => {
  const { data: menuItems, isSuccess } = useAccountNav();

  return (
    <Menu>
      <Menu.Button className="flex  gap-2 hover:bg-primary-600 px-2 rounded text-sm">
        <span className="m-auto">My account</span>
        <FaChevronDown className=" m-auto" size={12} />
      </Menu.Button>
      <Menu.Items className="absolute bg-white text-gray-700  rounded top-12 z-10 max-h-40 w-40 overflow-y-auto shadow-lg">
        {isSuccess &&
          menuItems?.map((option) => (
            <Menu.Item>
              <div className="px-2 py-1 hover:bg-primary-100 text-sm text-gray-700">
                <Link to={`http://localhost:5173/app/${option.id}/activity`}>
                  {option.title}
                </Link>
              </div>
            </Menu.Item>
          ))}
      </Menu.Items>
    </Menu>
  );
};

export default AccoutMenu;
