import React from "react";
import {
  FaChartBar,
  FaClosedCaptioning,
  FaHome,
  FaMoneyBillWave,
  FaTrophy,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../Login/useLogin";
import Tooltip from "../../components/Tooltip/Tooltip";

const Sidebar = () => {
  const { logout } = useAuth();
  const { accountId } = useParams();

  const routes: { icon: React.ReactNode; link: string; name: string }[] = [
    {
      icon: <FaHome className="m-auto" />,
      link: `/`,
      name: "Acceuil",
    },
    {
      icon: <FaChartBar className="m-auto" />,
      link: `${accountId}/`,
      name: "Dashboard",
    },
    {
      icon: <FaMoneyBillWave className="m-auto" />,
      link: `${accountId}/activity`,
      name: "Activity",
    },
    {
      icon: <FaTrophy className="m-auto" />,
      link: `${accountId}/objectif`,
      name: "Objectif",
    },
  ];
  return (
    <div className="h-screen  flex justify-between   flex-col items-center    border-r">
      <div className="space-y-48 rounded-md">
        <ul className=" flex flex-col ">
          {routes.map((route) => (
            <Tooltip
              mode="hover"
              as="Legend"
              trigger={
                <Link to={route.link}>
                  <li className=" border h-12 w-12 flex">{route.icon}</li>
                </Link>
              }
            >
              {route.name}
            </Tooltip>
          ))}
        </ul>
      </div>
      <div>
        <div onClick={() => logout()}>
          <FaClosedCaptioning />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
