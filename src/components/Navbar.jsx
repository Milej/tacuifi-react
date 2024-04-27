import React, { useEffect } from "react";
import NavItem from "./NavItem";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, Close } from "@mui/icons-material";

const Navbar = () => {
  const location = useLocation().pathname;

  const [open, setOpen] = useState(false)

  const navItems = [
    {
      destination: "inicio",
      text: "Inicio",
    },
    {
      destination: "complejo-tacuifi",
      text: "Tacuifí I",
    },
    {
      destination: "complejo-tacuifi2",
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
    <nav className={`w-full md:px-10  ${open ? "h-fit bg-black" : "h-20 bg-black/70"} z-50 fixed`}>
      <div className="flex justify-between md:justify-around items-center">
        <div className={`p-3 ${open && "hidden"} md:block`}>
          <NavLink to="inicio">
            <img src="/logo.png" width={60} alt="" />
          </NavLink>
        </div>
        <ul className={`${open ? "flex flex-col w-full text-center py-10 space-y-3" : "hidden"} md:space-y-0 md:flex md:flex-row p-3 list-none`}>
          {navItems.map((item) => (
            <NavItem
              key={item.destination}
              destination={item.destination}
              text={item.text}
              setOpen={setOpen}
            />
          ))}
        </ul>
        <button className="text-white absolute px-10 py-7 top-0 right-0 md:hidden" onClick={(e) => setOpen(!open)}>{open ? <Close></Close> : <Menu></Menu>}</button>
      </div>
    </nav>
  );
};

export default Navbar;
