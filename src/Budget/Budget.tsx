import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Avatar from "../components/Avatar/Avatar";

const Budget = () => {
  return (
    <main className="h-screen   max-h-screen overflow-hidden flex">
      <Sidebar />
      <div className="h-screen overflow-hidden flex flex-col flex-1">
        <nav className=" bg-primary-500 text-white flex justify-between place-content-center py-2 px-10">
          <Avatar />
        </nav>
        <Outlet />
      </div>
    </main>
  );
};

export default Budget;
