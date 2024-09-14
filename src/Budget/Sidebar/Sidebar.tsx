import { compact } from "lodash";
import React from "react";
import {
  FaChartBar,
  FaDoorOpen,
  FaHome,
  FaMoneyBillWave,
  FaTrophy,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../../Login/useLogin";
import Tooltip from "../../components/Tooltip/Tooltip";

const sidebarItemStyle =
  " border dark:border-none h-12 w-12 flex hover:bg-primary-100 dark:hover:bg-primary-700 cursor-pointer justify-center items-center active:bg-primary-200 dark:active:bg-primary-800 transition-all duration-200 ease-in-out";
const Sidebar = () => {
  const { logout } = useAuth();
  const { accountId } = useParams();
  const path = window.location.pathname;

  const routes: { icon: React.ReactNode; link: string; name: string }[] =
    compact([
      {
        icon: <FaHome className="m-auto" />,
        link: `/`,
        name: "Acceuil",
      },
      accountId && {
        icon: <FaChartBar className="m-auto" />,
        link: `${accountId}/`,
        name: "Dashboard",
      },
      accountId && {
        icon: <FaMoneyBillWave className="m-auto" />,
        link: `${accountId}/activity`,
        name: "Activity",
      },
      accountId && {
        icon: <FaTrophy className="m-auto" />,
        link: `${accountId}/objectif`,
        name: "Objectif",
      },
    ]);

  return (
    <div className="h-screen  flex justify-between   flex-col items-center    border-r dark:border-none bg-white dark:bg-primary-600">
      <div className="space-y-48 rounded-md">
        <ul className=" flex flex-col ">
          {routes.map((route) => (
            <Tooltip
              mode="hover"
              as="Legend"
              trigger={
                <Link to={route.link} replace>
                  <li
                    className={twMerge(
                      sidebarItemStyle,
                      path === `/app/${route.link}` &&
                        "bg-primary-100 border-primary-500 text-primary-500"
                    )}
                  >
                    {route.icon}
                  </li>
                </Link>
              }
            >
              {route.name}
            </Tooltip>
          ))}
        </ul>
      </div>
      <div>
        <ul className=" flex flex-col ">
          <li className={twMerge(sidebarItemStyle)} onClick={() => logout()}>
            <FaDoorOpen className="m-auto" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
