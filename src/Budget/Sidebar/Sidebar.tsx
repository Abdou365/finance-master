import {
  FaChartBar,
  FaClosedCaptioning,
  FaMoneyBillWave,
  FaTrophy,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../Login/useLogin";
import { IconBase } from "react-icons/lib";
import React from "react";

const Sidebar = () => {
  const { logout } = useAuth();
  const { accountId } = useParams();

  const routes: { icon: React.ReactNode; link: string }[] = [
    {
      icon: <FaChartBar className="m-auto" />,
      link: `${accountId}/`,
    },
    {
      icon: <FaMoneyBillWave className="m-auto" />,
      link: `${accountId}/activity`,
    },
    {
      icon: <FaTrophy className="m-auto" />,
      link: `${accountId}/objectif`,
    },
  ];
  return (
    <div className="h-screen  flex justify-between   flex-col items-center    border-r">
      <div className="space-y-48 rounded-md">
        <ul className=" flex flex-col ">
          {routes.map((route) => (
            <Link to={route.link}>
              <li className=" border h-12 w-12 flex">{route.icon}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => logout()} className="btn-red">
          <FaClosedCaptioning />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
