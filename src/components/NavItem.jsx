import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ destination, text, setOpen }) => {
  return (
    <li className="mx-3">
      <NavLink
        className={({ isActive }) =>
          "text-white text-xl md:text-base hover:border-b hover:border-white uppercase " +
          (isActive ? "border-b-2 border-white" : "")
        }
        to={destination}
        onClick={() => setOpen(false)}>
        {text}
      </NavLink>
    </li>
  );
};

export default NavItem;
