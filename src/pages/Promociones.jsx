import { useNavigate } from "react-router-dom";

const Promotions = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contacto");
  };

  const promos = [
    {
      title: "Jubilados",
      discount: "10% OFF",
      description: "Descuento exclusivo para jubilados.",
      conditions: "Válido en temporada baja. No acumulable con otras promos. Pago en efectivo o transferencia.",
    },
    {
      title: "Escapada 3 noches",
      discount: "15% OFF",
      description: "Aprovechá un 15% de descuento en tu estadía de 3 noches.",
      conditions: "Válido en temporada baja.",
    },
    {
      title: "Mini vacaciones",
      discount: "20% OFF",
      description: "Si te quedás 4 noches, obtenés un 20% de descuento.",
      conditions: "Válido en temporada baja.",
    },
    {
      title: "Larga estadía",
      discount: "25% OFF",
      description: "Si te quedás 5 noches o más, te damos un 25% de descuento.",
      conditions: "Válido en temporada baja.",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-32">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">Promociones</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {promos.map((promo, idx) => (
          <div
            key={idx}
            className="relative bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition duration-300"
          >
            {/* Descuento */}
            <span className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
              {promo.discount}
            </span>

            {/* Título */}
            <h5 className="text-2xl font-bold text-gray-800 mb-3">{promo.title}</h5>

            {/* Descripción */}
            <p className="text-gray-600 mb-4">{promo.description}</p>

            {/* Condiciones */}
            <span className="text-gray-400 text-xs mb-6">{promo.conditions}</span>

            {/* CTA */}
            <button
              type="button"
              onClick={handleClick}
              className="mt-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
            >
              Consultar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promotions;
