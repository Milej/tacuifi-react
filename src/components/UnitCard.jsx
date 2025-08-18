import { Link } from "react-router-dom";

const UnitCard = ({ img, title, subtitle, link }) => {
  return (
    <div className="group relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105 duration-300 bg-white">
      {/* Imagen con overlay */}
      <div className="h-64 w-full overflow-hidden relative">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-60 transition" />
      </div>

      {/* Contenido */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-left z-10">
        <h4 className="text-2xl font-bold text-white drop-shadow-md">{title}</h4>
        <p className="text-sm md:text-base text-gray-200">{subtitle}</p>
        <Link
          to={link}
          className="inline-block mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm shadow-md transition"
        >
          Ver más detalles
        </Link>
      </div>
    </div>
  );
};

export default UnitCard;
