import { Wifi, CleaningServices, ConnectedTv, Bed, LocalParking, Hvac, Pets } from "@mui/icons-material";

const Services = () => {
  const services = [
    { icon: <Wifi className="text-green-500" />, text: "WiFi" },
    { icon: <CleaningServices className="text-green-500" />, text: "Limpieza diaria (opcional)" },
    { icon: <Bed className="text-green-500" />, text: "Ropa de cama" },
    { icon: <Bed className="text-green-500" />, text: "Toallas" },
    { icon: <ConnectedTv className="text-green-500" />, text: "DirecTV / Cable" },
    { icon: <LocalParking className="text-green-500" />, text: "Estacionamiento" },
    { icon: <Hvac className="text-green-500" />, text: "Calefacción" },
    { icon: <Pets className="text-green-500" />, text: "Aceptamos mascotas" },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">Servicios</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <li
            key={i}
            className="flex flex-col items-center text-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <span className="text-3xl">{s.icon}</span>
            <span className="mt-2 text-sm text-gray-700">{s.text}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Services;
