import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ destination, text }) => {
  return (
    <li className="mx-3">
      <NavLink
        className={({isActive}) =>
          "text-white text-lg hover:border-b-2 " +
          (isActive ? "border-b-2 border-white" : "")
        }
        to={`/${destination}`}
      >
        {text}
      </NavLink>
    </li>
  );
};

export default NavItem;
