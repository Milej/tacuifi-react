import { useState, useEffect } from "react";
import UnitDetail from "../components/UnitDetail";

const UnitDetailContainer = () => {

  const getData = async () => {
    const response = await fetch("/src/data.json");
    const data = await response.json();
    return data;
  };
  
  const [units, setUnits] = useState([]);

  useEffect(() => {
    getData()
    .then(datos => {
      setUnits(datos)
    })
  }, []);

  return (
    <UnitDetail units={units}/>
  );
};

export default UnitDetailContainer;
