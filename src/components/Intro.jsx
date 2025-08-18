import { MessageCircle } from "lucide-react";

const Intro = () => {
  return (
    <section className="relative bg-[url('/tacuifi/1.jpg')] bg-cover bg-center bg-no-repeat min-h-screen">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-lg mb-10">Cabañas Tacuifí</h1>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 md:p-10 max-w-4xl text-white space-y-6">
          <p className="text-base md:text-lg leading-relaxed font-medium">
            Nuestro complejo se encuentra ubicado en la localidad de Los Reartes, en pleno Valle de Calamuchita,
            Córdoba.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Estamos a 8,5 km de la localidad de Villa General Belgrano, 20km de Santa Rosa de Calamuchita, 35 km de La
            Cumbrecita, 12 km del Dique Los Molinos, 38km de Embalse de Río III, y 90 km de la Ciudad de Córdoba,
            comunicadas por rutas pavimentadas.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            Los Reartes, lugar turístico en el que se destacan la belleza de las serranías así como sus ríos de aguas
            cristalinas, le brinda la posibilidad de un merecido descanso disfrutando confort, tranquilidad y tradición.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a
              href="/contacto" // 👉 ajustalo al route de tu página de contacto
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl text-lg shadow-lg transition transform hover:scale-105"
            >
              <MessageCircle size={20} />
              Contactanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
