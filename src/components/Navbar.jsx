import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CONTACTO, INICIO, PROMOCIONES, TACUIFI } from "../config/rutas";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { destination: INICIO, text: "Inicio", exact: true },
    { destination: TACUIFI, text: "Tacuifí I" },
    { destination: PROMOCIONES, text: "Promociones" },
    { destination: CONTACTO, text: "Contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-20">
        {/* Logo */}
        <NavLink to={INICIO} end className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Cabañas Tacuifí"
            className="w-12 h-12 object-contain transition-transform hover:scale-110"
          />
          <span className="text-white font-bold text-xl tracking-wide hidden sm:block">Cabañas Tacuifí</span>
        </NavLink>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.destination}>
              <NavLink
                to={item.destination}
                end={item.exact} // 👈 importante para que "/" no quede siempre activo
                className={({ isActive }) =>
                  `relative text-lg font-medium transition ${
                    isActive ? "text-green-400 after:w-full" : "text-white hover:text-green-300 after:w-0"
                  } 
                  after:content-[''] after:block after:h-[2px] after:bg-green-400 
                  after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1`
                }
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile button */}
        <button className="text-white md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {/* Mobile menu */}
      <div
        className={`fixed inset-0 h-screen w-screen bg-gradient-to-b from-black/95 to-black/80 backdrop-blur-md transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        {/* Header con logo y cerrar */}
        <div className="flex justify-between items-center px-6 h-20 border-b border-white/10">
          <NavLink to={INICIO} onClick={() => setOpen(false)}>
            <img src="/logo.png" alt="logo" className="w-12 h-12" />
          </NavLink>
          <button onClick={() => setOpen(false)} className="text-white">
            <X size={32} />
          </button>
        </div>

        {/* Links centrados */}
        <ul className="flex flex-col items-center justify-center h-[calc(100%-5rem)] space-y-10">
          {navItems.map((item) => (
            <li key={item.destination}>
              <NavLink
                to={item.destination}
                end={item.exact}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `relative text-2xl font-semibold tracking-wide transition ${
                    isActive ? "text-green-400 after:w-full" : "text-white hover:text-green-300 after:w-0"
                  } 
            after:content-[''] after:block after:h-[3px] after:bg-green-400 
            after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-2`
                }
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
