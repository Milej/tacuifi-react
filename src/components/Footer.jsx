import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";

const Footer = () => {
  return (
    <div className="bg-zinc-700 px-10 text-white">
      <div className="flex justify-center py-6">
        <span className="mx-2">
          <PhoneIcon />
          +54 9 3546 402842
        </span>

        <span className="mx-2">
          <PlaceIcon />
          Tacuifí I - Av. San Martín s/n
        </span>

        <span className="mx-2">
          <PlaceIcon />
          Tacuifí II - Av. Costanera Bartolomé Lema & 25 De Junio
        </span>
      </div>
      <p className="uppercase tracking-widest text-center py-6">
        Cabañas Tacuifí - Todos los derechos reservados - 2023
      </p>
    </div>
  );
};

export default Footer;
