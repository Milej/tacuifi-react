import React, { useState, useEffect } from "react";
import UnitDetail from "../components/UnitDetail";
import { useParams } from "react-router-dom";

const UnitDetailContainer = () => {
  const { unitId } = useParams();

  const getData = async () => {
    const response = await fetch("./../data.json");
    const data = await response.json();
    return data;
  };
  
  const [unit, setUnit] = useState([]);

  useEffect(() => {
    getData().then((unit) => setUnit(unit), []);
  });

  return (
    <UnitDetail
    // title={unit}
    // subtitle={subtitle}
    // info={info}
    // equipment={equipment}
    // img={imgApartamentos}
    />
  );
};

export default UnitDetailContainer;
