import React from "react";
import {
  FaChartBar,
  FaClosedCaptioning,
  FaDoorOpen,
  FaHome,
  FaMoneyBillWave,
  FaTrophy,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../Login/useLogin";
import Tooltip from "../../components/Tooltip/Tooltip";
import { compact } from "lodash";

const sidebarItemStyle =
  " border dark:border-none h-12 w-12 flex hover:bg-primary-100 dark:hover:bg-primary-700 cursor-pointer justify-center items-center active:bg-primary-200 dark:active:bg-primary-800 transition-all duration-200 ease-in-out";
const Sidebar = () => {
  const { logout } = useAuth();
  const { accountId } = useParams();

  const routes: { icon: React.ReactNode; link: string; name: string }[] = compact([
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
                <Link to={route.link}>
                  <li className={sidebarItemStyle}>{route.icon}</li>
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
        <Link to={'/user'}>
          <li className={sidebarItemStyle}>
            <FaUserCircle className="m-auto" />
          </li>
          </Link>
          <li className={sidebarItemStyle} onClick={() => logout()}>
            <FaDoorOpen className="m-auto" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
