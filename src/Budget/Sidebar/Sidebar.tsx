import {
  FaChartBar,
  FaClosedCaptioning,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../Login/useLogin";

const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <div className="h-screen  flex justify-between   flex-col items-center    border-r">
      <div className="space-y-48 rounded-md">
        <ul className=" flex flex-col ">
          <Link to={"/"}>
            <li className=" h-12 w-12 border content-center">
              <FaChartBar className="m-auto" />
            </li>
          </Link>
          <Link to={"/activity"}>
            <li className=" border h-12 w-12 flex">
              <FaMoneyBillWave className="m-auto" />
            </li>
          </Link>
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
