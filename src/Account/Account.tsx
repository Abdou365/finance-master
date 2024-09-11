import { FaFolderOpen, FaUserCircle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../Budget/Sidebar/Sidebar";
import NavBar from "../components/NavBar/NavBar";
import TabComponent from "../components/Tab/TabComponent";
import { AccountList } from "./AccountList";
import Profile from "./Profile";
import { ProfileHeader } from "./ProfileHeader";

const tabs = [
  {
    name: "account",
    label: "Comptes",
    icon: FaFolderOpen,
    content: <AccountList />,
  },
  {
    name: "profile",
    label: "Profile",
    icon: FaUserCircle,
    content: <Profile />,
  },
];

const Account = () => {
  const [params, setParams] = useSearchParams();
  const selectedTab = params.get("view") || "account";
  const setSelectedTab = (tabName: string) => {
    setParams({ view: tabName });
  };

  return (
    <div className=" h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavBar />
        <div className=" overflow-auto lk-scroll">
          <ProfileHeader />
          <TabComponent
            tabs={tabs}
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
