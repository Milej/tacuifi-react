import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import { añoActual } from "../helpers/fechas";

const Footer = () => {
  return (
    <>
      <div className="bg-zinc-700 px-10 text-white">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:justify-around border-b py-8 border-gray-400">
          <span className="text-sm">
            <PhoneIcon />
            +54 9 3546 402842
          </span>

          <span className="text-sm">
            <PlaceIcon />
            Tacuifí I - Av. San Martín s/n
          </span>

          {/* <span className="text-sm">
            <PlaceIcon />
            Tacuifí II - Av. Costanera Bartolomé Lema & 25 De Junio
          </span> */}
        </div>
        <p className="text-base uppercase tracking-widest text-center py-6">
          Cabañas Tacuifí - Todos los derechos reservados - {añoActual()}
        </p>
      </div>
      <div className="bg-gray-950 py-2 text-white">
        <p className="text-center">
          Desarrollado por
          <a href="https://www.instagram.com/maxmenvielle17" target="_blank" className="font-semibold tracking-tighter">
            {" "}
            Max Menvielle
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
