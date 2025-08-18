import { Phone, MapPin } from "lucide-react";
import { añoActual } from "../helpers/fechas";

const Footer = () => {
  return (
    <footer className="text-white">
      {/* Top */}
      <div className="bg-gray-900 px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-around gap-6 border-b border-gray-700 py-8 text-center lg:text-left">
          {/* Teléfono */}
          <a
            href="tel:+543546402842"
            className="flex items-center gap-2 text-sm md:text-base hover:text-green-400 transition"
          >
            <Phone size={18} />
            +54 9 3546 402842
          </a>

          {/* Dirección */}
          <p className="flex items-center gap-2 text-sm md:text-base hover:text-green-400 transition">
            <MapPin size={18} />
            Tacuifí I - Av. San Martín s/n
          </p>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col items-center py-6 gap-3">
          <p className="uppercase tracking-widest text-sm md:text-base text-gray-300">Síguenos</p>
          <div className="flex gap-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/Tacuifi/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-green-500 transition shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1 .9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.3 3h-1.9v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/tacuifi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-green-500 transition shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.6 0 3 1.4 3 3v10c0 1.6-1.4 3-3 3H7c-1.6 0-3-1.4-3-3V7c0-1.6 1.4-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm5.8-3.3a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Derechos reservados */}
        <p className="text-sm md:text-base tracking-wider text-center pb-6">
          © Cabañas Tacuifí - Todos los derechos reservados - {añoActual()}
        </p>
      </div>

      {/* Bottom */}
      <div className="bg-gray-950 py-3">
        <p className="text-center text-xs md:text-sm">
          Desarrollado por{" "}
          <a
            href="https://www.instagram.com/maxmenvielle17"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-green-400 transition"
          >
            Max Menvielle
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
