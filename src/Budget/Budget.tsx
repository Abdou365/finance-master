import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

const Budget = () => {
  return (
    <main className="h-screen   max-h-screen overflow-hidden flex">
      <Sidebar />
      <div className="h-screen overflow-hidden flex flex-col flex-1">
        <nav className=" flex   justify-between place-content-center py-1 px-10"></nav>
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default Budget;
