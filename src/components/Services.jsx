import { Wifi, CleaningServices, BakeryDining, ConnectedTv, Bed, LocalParking, Hvac, Pets } from "@mui/icons-material"

const Services = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold pt-4 text-center">Servicios</h2>
      <ul className="grid grid-cols-2">
        <li className="flex flex-col items-center text-lg py-1">
          <span className=""><Wifi /></span>
          Wi fi
        </li>
        <li className="flex flex-col items-center text-lg py-1">
          <span className=""><BakeryDining /></span>
          Desayuno
        </li>
        <li className="flex flex-col items-center text-lg py-1">
          <span className=""><CleaningServices /></span>
          Limpieza diaria
        </li>
        <li className="flex flex-col items-center text-lg py-1">
          <span className=""><Bed /></span>
          Ropa de cama
        </li>
        <li className="flex flex-col items-center text-lg py-1">
          <span className=""><Bed /></span>
          Toallas
        </li>
        <li className="flex flex-col items-center text-lg py-1">
          <span className=""><ConnectedTv /></span>
          DirecTV / Cable
        </li>
        <li className="flex flex-col items-center text-lg py-1">
          <span className=""><LocalParking /></span>
          Estacionamiento
        </li>
        <li className="flex flex-col items-center text-lg py-1">
          <span className=""><Hvac /></span>
          Calefacción
        </li>
        <li className="flex flex-col items-center text-lg py-1">
          <span className=""><Pets /></span>
          Aceptamos mascotas
        </li>
      </ul>
    </>
  )
}

export default Services