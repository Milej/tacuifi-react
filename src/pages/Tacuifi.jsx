import React from "react";
import UnitCard from "../components/UnitCard";
import { Link } from "react-router-dom";

const Tacuifi = () => {
  return (
    <div className="container mx-auto py-5 md:py-8 text-center">

      <h2 className="text-4xl md:text-5xl">Tacuifí I</h2>

      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-around py-4">
        <Link to="/unit/apartamento">
          <UnitCard
            img="/apartamentos/1.jpeg"
            title="Apartamento"
            subtitle="Hasta 2 personas"
          />
        </Link>
        <Link to="/unit/cabana-piedra">
          <UnitCard
            img="/cabanas-piedra/1.jpg"
            title="Cabaña de piedra"
            subtitle="Hasta 4 personas"
          />
        </Link>
      </div>
    </div>
  );
};

export default Tacuifi;
