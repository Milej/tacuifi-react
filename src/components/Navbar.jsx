import React, { useEffect } from "react";
import NavItem from "./NavItem";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation().pathname;

  const [fixed, setFixed] = useState("");

  useEffect(() => {
    location === "/" || location === "/inicio" ? setFixed("fixed") : setFixed("");
  });

  const navItems = [
    {
      destination: "inicio",
      text: "Inicio",
    },
    {
      destination: "tacuifi",
      text: "Tacuifí I",
    },
    {
      destination: "tacuifi2",
      text: "Tacuifí II",
    },
    {
      destination: "promociones",
      text: "Promociones",
    },
    {
      destination: "contacto",
      text: "Contacto",
    },
  ];

  return (
    <nav
      className={`flex justify-around bg-black/70 p-3 w-full top-0 z-50 ${fixed}`}
    >
      <div className="brand">
        <NavLink to="inicio">
          <img src="/src/assets/images/logo.png" width={60} alt="" />
        </NavLink>
      </div>
      <ul className="flex p-3 list-none">
        {navItems.map((item) => (
          <NavItem
            key={item.destination}
            destination={item.destination}
            text={item.text}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
