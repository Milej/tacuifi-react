import React from "react";
import UnitCard from "../components/UnitCard";
import { Link } from "react-router-dom";

const Tacuifi2 = () => {
  return (
    <div className="p-10 text-center">
      <h2 className="text-5xl">Tacuifí II</h2>

      <div className="flex justify-around py-20">
        <Link to="/unit/duplex">
          <UnitCard
            img="http://resource.ferozo.net/tacuifi/duplex/1.jpg"
            title="Dúplex"
            subtitle="Hasta 2 personas"
          />
        </Link>
        <Link to="/unit/cabana-colonial">
          <UnitCard
            img="http://resource.ferozo.net/tacuifi/cabanas-coloniales/1.jpg"
            title="Cabaña colonial"
            subtitle="Hasta 5 personas"
          />
        </Link>
      </div>
    </div>
  );
};

export default Tacuifi2;
