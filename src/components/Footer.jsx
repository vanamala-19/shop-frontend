import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    // <!-- Footer section with social media icons and newsletter sign-up -->
    <footer
      className={`${theme}-theme text-${theme} -bottom-full w-full m-0 p-0 h-10 `}>
      <div className=" container px-6 flex-grow">
        {/* Social media icons and newsletter sign-up */}
        {/* ... */}

        {/* Copyright section */}
        <div className="w-full text-center mt-4">
          © 2023 Copyright : Vanamala
        </div>
      </div>
    </footer>
  );
};

export default Footer;
