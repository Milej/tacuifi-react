import React from "react";
import "./Intro.css";

const Intro = () => {
  return (
    <div className="intro bg-no-repeat bg-cover min-h-screen py-10">
      <div className="bg-black/30 min-h-screen">
        <h1 className="text-5xl md:text-5xl lg:text-7xl py-20 md:py-32 lg:py-40 text-center text-white font-semibold w-full">
          Cabañas Tacuifí
        </h1>
        <div className="container mx-auto bg-black/30 px-10 md:py-5 sm:px-20 text-xl max-w-7xl rounded-lg">
          <p className="text-white font-semibold text-base lg:text-lg py-5">
            Nuestro complejo se encuentra ubicado en la localidad de Los
            Reartes, en pleno Valle de Calamuchita, Córdoba.
          </p>
          <p className="text-white leading-loose text-base lg:text-lg py-5">
            Estamos a 8,5 km de la localidad de Villa General Belgrano, 20km de
            Santa Rosa de Calamuchita, 35 km de La Cumbrecita, 12 km del Dique Los
            Molinos, 38km de Embalse de Río III, y 90 km de la Ciudad de Córdoba,
            comunicadas por rutas pavimentadas.
          </p>
          <p className="text-white leading-loose text-base lg:text-lg py-5">
            Los Reartes, lugar turístico en el que se destacan la belleza de las
            serranías así como sus ríos de aguas cristalinas, le brinda la
            posibilidad de un merecido descanso disfrutando confort, tranquilidad
            y tradición.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
