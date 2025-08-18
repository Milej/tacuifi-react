import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Contacto = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [resetForm, setResetForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const emptyForm = {
    name: "",
    phone: "",
    email: "",
    paxAdult: "",
    paxChildren: "",
    paxBaby: "",
    checkin: "",
    checkout: "",
    message: "",
  };

  const send = async (data) => {
    setLoading(true);
    try {
      await axios.post("https://api.tacuifi.com.ar/mail", data);
      Swal.fire({
        title: "¡Consulta enviada!",
        text: "Gracias por contactarte, pronto te responderemos.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setResetForm(true);
    } catch (error) {
      console.error("Error: " + error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al enviar el mensaje. Intenta nuevamente en unos minutos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetForm && reset(emptyForm);
  }, [resetForm]);

  return (
    <section className="container mx-auto px-4 sm:px-6 py-24 sm:py-32">
      {/* Encabezado */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">
          Contáctanos
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
          Completá el formulario y nos pondremos en contacto enseguida.{" "}
          <span className="text-green-600 font-semibold">
            Tu descanso comienza aquí.
          </span>
        </p>
      </div>

      {/* Formulario */}
      <form
        className="grid grid-cols-1 xl:grid-cols-3 bg-white shadow-xl rounded-3xl overflow-hidden"
        onSubmit={handleSubmit(send)}
      >
        {/* Formulario (izquierda) */}
        <div className="col-span-2 p-6 sm:p-10 lg:p-14 grid grid-cols-12 gap-4 sm:gap-6">
          {/* Nombre */}
          <div className="col-span-12 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:ring-2 transition ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-400"
              }`}
              {...register("name", { required: "Campo requerido" })}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">{errors.name.message}</span>
            )}
          </div>

          {/* Teléfono */}
          <div className="col-span-12 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="text"
              placeholder="Ej: +54 9 ..."
              className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:ring-2 transition ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-400"
              }`}
              {...register("phone", { required: "Campo requerido" })}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">{errors.phone.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="col-span-12">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="ejemplo@mail.com"
              className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:ring-2 transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-400"
              }`}
              {...register("email", {
                required: "Campo requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Formato de email inválido",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}
          </div>

          {/* Pax */}
          <div className="col-span-12 sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adultos
            </label>
            <input
              type="number"
              className="w-full border rounded-xl px-4 py-3 border-gray-300 focus:ring-2 focus:ring-green-400"
              {...register("paxAdult", { required: "Campo requerido" })}
            />
          </div>
          <div className="col-span-12 sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Niños
            </label>
            <input
              type="number"
              className="w-full border rounded-xl px-4 py-3 border-gray-300 focus:ring-2 focus:ring-green-400"
              {...register("paxChildren")}
            />
          </div>
          <div className="col-span-12 sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bebés
            </label>
            <input
              type="number"
              className="w-full border rounded-xl px-4 py-3 border-gray-300 focus:ring-2 focus:ring-green-400"
              {...register("paxBaby")}
            />
          </div>

          {/* Fechas */}
          <div className="col-span-12 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check In
            </label>
            <input
              type="date"
              className={`w-full border rounded-xl px-4 py-3 focus:ring-2 ${
                errors.checkin
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-400"
              }`}
              {...register("checkin", { required: "Campo requerido" })}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check Out
            </label>
            <input
              type="date"
              className={`w-full border rounded-xl px-4 py-3 focus:ring-2 ${
                errors.checkout
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-400"
              }`}
              {...register("checkout", { required: "Campo requerido" })}
            />
          </div>

          {/* Consulta */}
          <div className="col-span-12">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consulta
            </label>
            <textarea
              rows="4"
              placeholder="Escribí tu mensaje..."
              className={`w-full border rounded-xl px-4 py-3 focus:ring-2 ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-400"
              }`}
              {...register("message", { required: "Campo requerido" })}
            ></textarea>
            {errors.message && (
              <span className="text-red-500 text-xs">
                {errors.message.message}
              </span>
            )}
          </div>

          {/* Botón */}
          <div className="col-span-12">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition disabled:bg-gray-400"
            >
              {loading ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Enviando...
                </>
              ) : (
                "Enviar consulta"
              )}
            </button>
          </div>
        </div>

        {/* Imagen lateral solo en desktop */}
        <div className="hidden xl:block col-span-1 relative">
          <img
            src="/tacuifi/1.jpg"
            alt="Cabañas Tacuifí"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 rounded-r-3xl"></div>
        </div>
      </form>
    </section>
  );
};

export default Contacto;
