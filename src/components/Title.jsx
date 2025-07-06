import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex  gap-2 mb-3 items-center">
      <h2 className="uppercase   sm:text-2xl font-medium text-gray-500">
        {text1} <span className="text-gray-700 ">{text2}</span>
      </h2>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-[#414141]"></p>
    </div>
  );
};

export default Title;
