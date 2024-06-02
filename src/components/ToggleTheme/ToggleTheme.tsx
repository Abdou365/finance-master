import React from "react";
import { useTheme } from "../../store.tsx/theme.ctx";
import "./ToggleTheme.scss";
import { FaMoon, FaSun } from "react-icons/fa";

const ToggleTheme: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div className=" flex relative align-middle items-center">
      <input
        type="checkbox"
        className="lk-input--switch theme-switcher"
        checked={theme === "dark"}
        onChange={handleToggle}
      />
      {theme === "light" ? (
        <FaSun className=" absolute h-2 left-[2.5px] fill-primary-200 pointer-events-none" />
      ) : (
        <FaMoon className=" absolute h-2 right-[2.5px] fill-primary-800 pointer-events-none" />
      )}
    </div>
  );
};

export default ToggleTheme;
