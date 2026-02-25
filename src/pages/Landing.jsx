import Navbar from "../components/Navbar";
import Hero from "../components/Hero.jsx";
import Units from "../components/Units";
import Facilities from "../components/Facilities";
import Gallery from "../components/Gallery";
import Promotions from "../components/Promotions";
import Location from "../components/Location";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import Reveal from "../components/ui/Reveal";
import SectionWrap from "../components/ui/SectionWrap";

export default function Landing() {
  const BG = {
    base: "#f3f1eb",
    mid: "#ebe6dc",
    deep: "#e3ddd1",
    white: "#ffffff",
  };

  return (
    <div className="min-h-screen text-zinc-900" style={{ backgroundColor: BG.base }}>
      <Navbar />

      <main className="pt-16">
        <Hero />

        {/* ✅ Hero ya fanea a BG.mid. Acá no top fade. Y no bottom fade porque la siguiente también es BG.mid */}
        <SectionWrap id="apartamentos" bg={BG.mid} className="py-0">
          <Reveal className="px-0" delay={0}>
            <Units variant="apartamentos" />
          </Reveal>
        </SectionWrap>

        {/* ✅ mid -> white */}
        <SectionWrap id="cabanas-de-piedra" bg={BG.mid} fadeBottomTo={BG.white}>
          <Reveal delay={60}>
            <Units variant="piedra" />
          </Reveal>
        </SectionWrap>

        {/* ✅ white -> deep */}
        <SectionWrap id="instalaciones" bg={BG.white} fadeBottomTo={BG.deep}>
          <Reveal delay={80}>
            <Facilities />
          </Reveal>
        </SectionWrap>

        {/* ✅ deep -> mid */}
        <SectionWrap id="galeria" bg={BG.deep} fadeBottomTo={BG.mid}>
          <Reveal delay={90}>
            <Gallery />
          </Reveal>
        </SectionWrap>

        {/* ✅ mid -> white */}
        <SectionWrap id="promociones" bg={BG.mid} fadeBottomTo={BG.white}>
          <Reveal delay={100}>
            <Promotions />
          </Reveal>
        </SectionWrap>

        {/* ✅ white -> deep */}
        <SectionWrap id="ubicacion" bg={BG.white} fadeBottomTo={BG.deep}>
          <Reveal delay={110}>
            <Location />
          </Reveal>
        </SectionWrap>

        {/* ✅ deep -> base (cierre) */}
        <SectionWrap id="contacto" bg={BG.deep} fadeBottomTo={BG.base}>
          <Reveal delay={120}>
            <Contact />
          </Reveal>
        </SectionWrap>

        <Footer />
      </main>
    </div>
  );
}
