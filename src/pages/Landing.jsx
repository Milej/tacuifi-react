import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Units from "../components/Units";
import Facilities from "../components/Facilities";
import Gallery from "../components/Gallery";
import Promotions from "../components/Promotions";
import Location from "../components/Location";
import Contact from "../components/Contact";
import Reveal from "../components/ui/Reveal";
import SectionWrap from "../components/ui/SectionWrap";
import { DEFAULT_HOME_CONTENT } from "../content/defaultHomeContent";
import { useSiteContent } from "../context/SiteContentContext";

export default function Landing() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { content: homeContent, loading: contentLoading } = useSiteContent();

  const BG = {
    base: "#ebe6dc",
    beige: "#ebe6dc",
    white: "#ffffff",
  };

  useEffect(() => {
    const sectionId = location.hash.replace("#", "");
    if (!sectionId) return;

    const timeoutId = window.setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash, searchParams]);

  if (contentLoading || !homeContent) {
    return (
      <div className="min-h-screen bg-[var(--tacuifi-bg)] pt-24 text-zinc-900">
        <main className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
          <div className="rounded-[32px] border border-emerald-900/10 bg-white/80 p-10 text-center shadow-[0_15px_45px_rgba(24,24,27,0.06)]">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-emerald-800/20 border-t-emerald-800" />
            <p className="mt-4 text-sm text-zinc-600">Cargando contenido de la portada...</p>
          </div>
        </main>
      </div>
    );
  }

  const accommodations = homeContent.accommodations || DEFAULT_HOME_CONTENT.accommodations;
  const getAlternatingBg = (index) => (index % 2 === 0 ? BG.beige : BG.white);
  const sections = [
    ...accommodations.map((unit, index) => ({
      key: unit.id,
      id: unit.anchorId,
      bg: getAlternatingBg(index),
      className: index === 0 ? "py-0" : "",
      revealClassName: index === 0 ? "px-0" : "",
      delay: index === 0 ? 0 : 60,
      content: <Units unit={unit} />,
    })),
    {
      key: "instalaciones",
      id: "instalaciones",
      bg: getAlternatingBg(accommodations.length),
      delay: 80,
      content: <Facilities section={homeContent.facilitiesSection} items={homeContent.facilities} />,
    },
    {
      key: "galeria",
      id: "galeria",
      bg: getAlternatingBg(accommodations.length + 1),
      delay: 90,
      content: <Gallery section={homeContent.gallerySection} items={homeContent.galleryItems} />,
    },
    {
      key: "promociones",
      id: "promociones",
      bg: getAlternatingBg(accommodations.length + 2),
      delay: 100,
      content: (
        <Promotions
          section={homeContent.promotionsSection}
          promotions={homeContent.promotions}
          accommodations={accommodations}
        />
      ),
    },
    {
      key: "ubicacion",
      id: "ubicacion",
      bg: getAlternatingBg(accommodations.length + 3),
      delay: 115,
      content: <Location section={homeContent.locationSection} />,
    },
    {
      key: "contacto",
      id: "contacto",
      bg: getAlternatingBg(accommodations.length + 4),
      delay: 120,
      content: <Contact content={homeContent.contactSection} accommodations={accommodations} />,
    },
  ];

  return (
    <div className="min-h-screen text-zinc-900" style={{ backgroundColor: BG.base }}>
      <main className="pt-16">
        <Hero content={homeContent.hero} />

        {sections.map((section, index) => (
          <SectionWrap
            key={section.key}
            id={section.id}
            bg={section.bg}
            className={section.className || ""}
            fadeBottomTo={index === sections.length - 1 ? BG.base : sections[index + 1].bg}
          >
            <Reveal className={section.revealClassName || ""} delay={section.delay}>
              {section.content}
            </Reveal>
          </SectionWrap>
        ))}
      </main>
    </div>
  );
}
