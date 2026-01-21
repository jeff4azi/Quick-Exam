import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
      <div
        className="bg-[#06B6D4] dark:bg-[#22D3EE] h-3 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;