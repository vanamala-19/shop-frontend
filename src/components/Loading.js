import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center dark:bg-dark bg-light">
      <div className="animate-spin h-16 w-16 border-t-4 border-t-primary dark:border-t-light border-b-4 border-b-transparent border-l-4 border-l-transparent border-r-4 border-r-transparent rounded-full"></div>
    </div>
  );
};

export default LoadingPage;
