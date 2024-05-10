import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import NavBar from "../components/NavBar/NavBar";

const Budget = () => {
  return (
    <main className="h-screen   max-h-screen overflow-hidden flex">
      <Sidebar />
      <div className="h-screen overflow-hidden flex flex-col flex-1">
        <NavBar />
        <Outlet />
      </div>
    </main>
  );
};

export default Budget;
