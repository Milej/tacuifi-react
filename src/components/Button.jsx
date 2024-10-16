import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ text, page }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(page);
  };

  return (
    <button
      className="bg-transparent hover:bg-zinc-700 text-zinc-800 font-semibold hover:text-white py-2 px-4 border border-zinc-500 hover:border-transparent"
      onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
