import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UnitDetail from "../components/UnitDetail";
import Loader from "../components/Loader";
import Error404 from "./Error404";

const Unidad = () => {
  const { id } = useParams();

  const [unidad, setUnidad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setearUnidad = async () => {
    try {
      const response = await fetch("/data.json");
      const data = await response.json();
      const unidadEncontrada = data.find(u => u.id == id);
      setUnidad(unidadEncontrada);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setearUnidad();
  }, [id]);

  return loading ? <Loader /> : unidad != undefined ? <UnitDetail unidad={unidad} /> : <Error404 />;
};
export default Unidad;
