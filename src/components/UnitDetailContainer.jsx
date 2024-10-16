import { useState, useEffect } from "react";
import UnitDetail from "../components/UnitDetail";
import { useParams } from "react-router-dom";

const UnitDetailContainer = () => {
  

  return <UnitDetail unidad={unidad} loading={loading} />;
};

export default UnitDetailContainer;
