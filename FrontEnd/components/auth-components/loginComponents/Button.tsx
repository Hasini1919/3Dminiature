import React from "react";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; 
  disabled?: boolean; 
}

const Button: React.FC<ButtonProps> = ({
  text,
  className = "",
  onClick,
  type = "button", 
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded shadow w-full transition duration-300 ease-in-out ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
