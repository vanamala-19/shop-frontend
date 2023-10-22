// ThemeSwitch.js
import React, { useContext } from "react";
import Switch from "react-switch";
import ThemeContext from "../context/ThemeContext";

const ThemeSwitch = () => {
  const { theme, handleThemeChange } = useContext(ThemeContext);

  return (
    <label>
      {/* <span>Switch to {theme === "light" ? "Dark" : "Light"} Theme</span> */}
      <Switch
        onChange={handleThemeChange}
        checked={theme === "dark"}
        checkedIcon={false}
        uncheckedIcon={false}
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
