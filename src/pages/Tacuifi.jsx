import React from "react";
import UnitCard from "../components/UnitCard";
import { Link } from "react-router-dom";

const Tacuifi = () => {
  return (
    <div className="p-10 text-center">
      <h2 className="text-5xl">Tacuifí I</h2>

      <div className="flex justify-around py-20">
        <Link to="/unit/apartamento">
          <UnitCard
            img="http://resource.ferozo.net/tacuifi/apartamentos/1.jpeg"
            title="Apartamento"
            subtitle="Hasta 2 personas"
          />
        </Link>
        <Link to="/unit/cabana-piedra">
          <UnitCard
            img="http://resource.ferozo.net/tacuifi/cabanas-piedra/1.jpg"
            title="Cabaña de piedra"
            subtitle="Hasta 4 personas"
          />
        </Link>
      </div>
    </div>
  );
};

export default Tacuifi;
