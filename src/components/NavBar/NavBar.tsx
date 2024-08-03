import React from "react";
import { FaDoorClosed } from "react-icons/fa";
import { useAuth } from "../../Login/useLogin";
import store from "../../store.tsx/store";
import VerticalMenu from "../Menu/VerticalMenu";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import Tooltip from "../Tooltip/Tooltip";
import AccoutMenu from "./AccoutMenu";

const NavBar: React.FC = () => {
  const { logout } = useAuth();
  const { email } = store.user() || { email: "" };
  return (
    <nav className="bg-primary-500 text-white flex justify-between place-content-center py-2 px-10">
      <AccoutMenu />
      <div className="flex gap-2">
        <Tooltip mode="click" trigger={<button>{email}</button>} as="Poppup">
          <VerticalMenu
            items={[
              {
                type: "link",
                content: "Se déconnecter",
                icon: FaDoorClosed,
                onClick: logout,
              },
            ]}
          />
        </Tooltip>
        <ToggleTheme />
      </div>
    </nav>
  );
};

export default NavBar;
