import React from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

const DisclaimerAlert = () => {
  const [acknowledged, setAcknowledged] = useLocalStorage(
    "disclaimer-ack",
    false
  );

  if (acknowledged) {
    return null;
  }

  const handleAcknowledge = () => {
    setAcknowledged(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 text-center z-50">
      <p className="mb-4">
        This website is for educational purposes only. All product information
        is sourced from DummyJSON open source project (https://dummyjson.com).
      </p>
      <button
        className="bg-red-600 text-white py-2 px-4 rounded-md"
        onClick={handleAcknowledge}>
        Got it
      </button>
    </div>
  );
};

export default DisclaimerAlert;
