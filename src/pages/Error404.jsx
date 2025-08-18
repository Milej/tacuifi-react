import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 text-center bg-gray-50">
      {/* Emoji o ilustración */}
      <div className="text-7xl mb-6">😕</div>

      {/* Títulos */}
      <h1 className="text-5xl font-extrabold text-gray-800">404</h1>
      <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-gray-600">¡Oops! Página no encontrada</h2>
      <p className="mt-2 text-gray-500 max-w-md">
        La página que buscas no existe o fue movida. Volvé al inicio y seguí explorando nuestras cabañas.
      </p>

      {/* Botón */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md transition"
      >
        Volver atrás
      </button>

      {/* Opción extra: ir al home */}
      <button
        onClick={() => navigate("/")}
        className="mt-3 px-6 py-2 border border-green-500 text-green-600 hover:bg-green-50 font-medium rounded-lg transition"
      >
        Ir al inicio
      </button>
    </div>
  );
};

export default Error404;
