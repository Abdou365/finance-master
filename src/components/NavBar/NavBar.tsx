import Avatar from "../Avatar/Avatar";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import AccoutMenu from "./AccoutMenu";

const NavBar = (props: Props) => {
  return (
    <nav className="bg-primary-500 text-white flex justify-between place-content-center py-2 px-10">
      <AccoutMenu />
      <ToggleTheme />
      <Avatar />
    </nav>
  );
};

export default NavBar;
