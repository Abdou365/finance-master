import Avatar from "../Avatar/Avatar";
import AccoutMenu from "./AccoutMenu";

const NavBar = (props: Props) => {
  return (
    <nav className="bg-primary-500 text-white flex justify-between place-content-center py-2 px-10">
      <AccoutMenu />
      <input type="checkbox" className="lk-input--switch" />
      <Avatar />
    </nav>
  );
};

export default NavBar;
