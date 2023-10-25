import React, { useContext } from "react";
import Switch from "react-switch";
import ThemeContext from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons from react-icons

const ThemeSwitch = () => {
  const { theme, handleThemeChange } = useContext(ThemeContext);

  return (
    <label>
      <Switch
        onChange={handleThemeChange}
        checked={theme === "dark"}
        checkedIcon={
          <span>
            <FaMoon color="white" size={12} />
          </span>
        } // Set paddingLeft to 0 for moon icon
        uncheckedIcon={
          <span>
            <FaSun color="yellow" size={12} />
          </span>
        } // Set paddingRight to 0 for sun icon
        height={20}
        width={48}
        handleDiameter={24}
        offColor="#bbb"
        onColor="#333"
      />
    </label>
  );
};

export default ThemeSwitch;
