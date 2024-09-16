import React from "react";

const CustomButton = ({ type, icon, text, onClick }) => {
  const typeClasses = {
    primary: "bg-theme-primary text-white border-theme-primary",
    secondary:
      "bg-white text-gray-800 border-gray-800 hover:text-theme-primary",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 w-full max-w-[500px] rounded-full border flex items-center justify-center gap-2 
        ${typeClasses[type]}
        `}
    >
      {icon}
      {text}
    </button>
  );
};

export default CustomButton;
