import React from "react";

const Button = ({ onClick, children, icon: Icon, className = "", isActive = false, }) => {
  return (
    <button
      onClick={onClick}
      className={`flex gap-2 items-center p-2 rounded-lg ${
        isActive ? "bg-indigo-900 text-white" : "hover:bg-indigo-900 hover:text-white"
      } ${className}`}
    >
      {Icon && <Icon className="text-current" />} {/* icon is optional here  */}
      {children && <h1>{children}</h1>} {/* Rendering children as per we required*/}
    </button>
  );
};

export default Button;
