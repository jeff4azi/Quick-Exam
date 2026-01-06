import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
      <div
        className="bg-[#06B6D4] h-3 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;