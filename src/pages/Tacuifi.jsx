import UnitCard from "../components/UnitCard";

const Tacuifi = () => {
  return (
    <section className="container mx-auto py-32 px-6 text-center">
      {/* Encabezado */}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Tacuifí I</h2>
      <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
        Descubre nuestras opciones de alojamiento y elegí la que mejor se adapte a tu estadía. Confort, tranquilidad y
        naturaleza en un solo lugar.
      </p>

      {/* Unidades */}
      <div className="mt-12 flex flex-col lg:flex-row gap-10 justify-center items-center">
        <UnitCard img="/apart/1.jpeg" title="Apartamento" subtitle="Ideal para 2 personas" link="/unidad/apartamento" />
        <UnitCard
          img="/cabana/1.jpg"
          title="Cabaña de piedra"
          subtitle="Perfecta para hasta 4 personas"
          link="/unidad/piedra"
        />
      </div>
    </section>
  );
};

export default Tacuifi;
