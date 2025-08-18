import Iframe from "react-iframe";
import CarouselContainer from "./CarouselContainer";
import { NavLink } from "react-router-dom";

const Card = ({ title, text, location, folder, images, destination }) => {
  return (
    <div className="rounded-2xl shadow-xl bg-white overflow-hidden transition transform hover:scale-[1.01] hover:shadow-2xl duration-300">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 p-8">
        {/* Título */}
        <div className="col-span-1 xl:col-span-2 text-center">
          <NavLink to={destination}>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-800 hover:text-green-600 transition">
              {title}
            </h2>
          </NavLink>
          <p className="mt-4 text-gray-600 text-base md:text-lg xl:text-xl max-w-3xl mx-auto leading-relaxed">{text}</p>
        </div>

        {/* Carousel */}
        <div className="col-span-1 flex flex-col">
          <CarouselContainer images={images} folder={folder} />
        </div>

        {/* Mapa */}
        <div className="col-span-1 h-72 md:h-96 xl:h-[500px] rounded-xl overflow-hidden shadow-lg">
          <Iframe url={location} className="w-full h-full border-0" />
        </div>

        {/* Botón CTA */}
        <div className="col-span-1 xl:col-span-2 flex justify-center">
          <NavLink
            to={destination}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl text-lg shadow-lg transition transform hover:scale-105"
          >
            Conocer más
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
