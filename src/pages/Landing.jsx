import Navbar from "../components/Navbar";
import Hero from "../components/Hero.jsx";
import Units from "../components/Units";
import Facilities from "../components/Facilities";
import Gallery from "../components/Gallery";
import Promotions from "../components/Promotions";
import Location from "../components/Location";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-zinc-900">
      <Navbar />
      <main className="pt-16">
        <Hero />

        {/* NAVLINKS / SECCIONES */}
        <section id="apartamentos">
          <Units variant="apartamentos" />
        </section>

        <section id="cabanas-de-piedra">
          <Units variant="piedra" />
        </section>

        <section id="instalaciones">
          <Facilities />
        </section>

        <section id="galeria">
          <Gallery />
        </section>

        <section id="promociones">
          <Promotions />
        </section>

        <section id="ubicacion">
          <Location />
        </section>

        <section id="contacto">
          <Contact />
        </section>

        <Footer />
      </main>
    </div>
  );
}
