import CarouselContainer from "./CarouselContainer";
import Services from "./Services";
import { LiveTv, DryCleaning, Coffee, Kitchen, Microwave, Blender, AcUnit } from "@mui/icons-material";

const UnitDetail = ({ unidad }) => {
  const showIcon = (icon) => {
    switch (icon) {
      case "LiveTv":
        return <LiveTv className="text-green-500" />;
      case "Coffee":
        return <Coffee className="text-green-500" />;
      case "Kitchen":
        return <Kitchen className="text-green-500" />;
      case "Microwave":
        return <Microwave className="text-green-500" />;
      case "Blender":
        return <Blender className="text-green-500" />;
      case "DryCleaning":
        return <DryCleaning className="text-green-500" />;
      case "AcUnit":
        return <AcUnit className="text-green-500" />;
      default:
        return null;
    }
  };

  const phone = "5493546402842";
  const mensaje = encodeURIComponent(`Hola 👋, quiero consultar disponibilidad para la unidad: ${unidad.title}`);

  return (
    <section className="container mx-auto px-6 lg:px-10 py-32 space-y-12">
      {/* Título */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">{unidad.title}</h1>
        <p className="mt-2 text-lg text-gray-500">{unidad.subtitle}</p>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Carrusel */}
        <div className="col-span-1 lg:col-span-3">
          <CarouselContainer images={unidad.images} folder={unidad.folder} />
        </div>

        {/* Info / Equipamiento / Servicios */}
        <div className="col-span-1 lg:col-span-2 space-y-8">
          {/* Información */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Información</h2>
            <p className="text-gray-600 leading-relaxed">{unidad.info}</p>
          </div>

          {/* Equipamiento */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">Equipado con</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {unidad.equipment.map((item, idx) => (
                <li
                  key={idx}
                  className="flex flex-col items-center text-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <span className="text-3xl">{showIcon(item.icon)}</span>
                  <span className="mt-2 text-sm text-gray-700">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <Services />
          </div>
        </div>
      </div>

      {/* CTA WhatsApp */}
      <div className="flex justify-center">
        <a
          href={`https://wa.me/${phone}?text=${mensaje}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg transition transform hover:scale-105"
        >
          Consultar disponibilidad por WhatsApp
        </a>
      </div>
    </section>
  );
};

export default UnitDetail;
