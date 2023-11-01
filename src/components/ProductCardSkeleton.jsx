import React from "react";

const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-44 bg-gray-200 rounded-md" />
      <div className="h-4 bg-gray-200 rounded-md" />
      <div className="h-3 bg-gray-200 rounded-md w-1/2" />
      {/* <div className="h-3 bg-gray-200 rounded-md w-1/4" /> */}
    </div>
  );
};

export default Skeleton;
