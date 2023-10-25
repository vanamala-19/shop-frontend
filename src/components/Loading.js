import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const LoadingPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={` bg-dark flex h-screen w-screen items-center justify-center`}>
      <div
        className={` animate-spin h-16 w-16 border-t-4 border-t-primary border-b-4 border-b-transparent border-l-4 border-l-transparent border-r-4 border-r-transparent rounded-full`}></div>
    </div>
  );
};

export default LoadingPage;
