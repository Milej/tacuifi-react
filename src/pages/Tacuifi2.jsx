import React from "react";
import UnitCard from "../components/UnitCard";
import { Link } from "react-router-dom";

const Tacuifi2 = () => {
  return (
    <div className="container mx-auto py-32 text-center">
      
      <h2 className="text-4xl md:text-5xl">Tacuifí II</h2>

      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-around py-4">
        <Link to="/unit/duplex">
          <UnitCard
            img="/duplex/1.jpg"
            title="Dúplex"
            subtitle="Hasta 2 personas"
          />
        </Link>
        <Link to="/unit/cabana-colonial">
          <UnitCard
            img="/cabanas-coloniales/1.jpg"
            title="Cabaña colonial"
            subtitle="Hasta 5 personas"
          />
        </Link>
      </div>
    </div>
  );
};

export default Tacuifi2;
