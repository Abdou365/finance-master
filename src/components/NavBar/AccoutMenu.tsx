import { Menu } from "@headlessui/react";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAccountNav } from "../../store.tsx/useAccount";
import Tooltip from "../Tooltip/Tooltip";
import VerticalMenu from "../Menu/VerticalMenu";
import Button from "../Button/Button";

const AccoutMenu: React.FC = () => {
  const { data: menuItems, isSuccess } = useAccountNav();
  const { account, accountId, ...rest } = useParams();
  const location = useLocation();
  const currentLocation = location.pathname.split("/").slice(3).join("/");

  return (
    <Tooltip
      mode="click"
      trigger={
        <Button>
          {menuItems?.find((r) => r.id === accountId)?.title || "Compte"}
          <FaChevronDown className=" m-auto" size={12} />
        </Button>
      }
      as="Poppup"
    >
      <VerticalMenu
        items={
          isSuccess
            ? menuItems?.map((option) => ({
                content: option.title,
                href: `/app/${option.id}/${currentLocation}`,
                type: "link",
              }))
            : []
        }
      />
    </Tooltip>
  );
};

export default AccoutMenu;
/*
    <Menu>
      <Menu.Button className="flex  gap-2 hover:bg-primary-600 px-2 rounded text-sm">

      </Menu.Button>
      <Menu.Items className="absolute bg-white text-gray-700  rounded top-12 z-10 max-h-40 w-40 overflow-y-auto shadow-lg">
        {isSuccess &&
          menuItems?.map((option) => (
            <Menu.Item>
              <div className="px-2 py-1 hover:bg-primary-100 text-sm text-gray-700">
                <Link to={`/app/${option.id}/${currentLocation}`}>
                  {option.title}
                </Link>
              </div>
            </Menu.Item>
          ))}
      </Menu.Items>
    </Menu>;

*/
