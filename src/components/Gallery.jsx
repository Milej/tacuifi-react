import { useMemo, useState } from "react";
import { Images, ChevronDown, ChevronUp } from "lucide-react";
import SectionTitle from "./SectionTitle";
import FullscreenViewer from "./FullscreenViewer";

const GALLERY_IMAGES = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];

const PREVIEW_COUNT = 8;

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const visibleImages = useMemo(() => {
    return showAll ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, PREVIEW_COUNT);
  }, [showAll]);

  const remaining = Math.max(0, GALLERY_IMAGES.length - PREVIEW_COUNT);

  const openAt = (i) => {
    const realIndex = showAll ? i : i;
    setInitialIndex(realIndex);
    setOpen(true);
  };

  return (
    <section id="galeria" className="relative py-14 md:py-16 bg-[#fbfaf7]">
      <SectionTitle
        eyebrow="Galería"
        title="Un vistazo al lugar"
        desc="Tocá cualquier foto para verla en pantalla completa y pasar como carrusel."
      />

      {/* Grid */}
      <div className="mx-auto max-w-6xl px-4 mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {visibleImages.map((file, i) => (
          <button
            key={file}
            onClick={() => openAt(i)}
            className="group relative rounded-3xl overflow-hidden border border-zinc-200 bg-white shadow-sm focus:outline-none"
          >
            <div className="aspect-square">
              <img
                src={`/galeria/${file}`}
                alt={`Galería ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
            <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-zinc-900 shadow">
                <Images className="h-4 w-4" />
                Ver
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Botón Ver más / Ver menos */}
      {GALLERY_IMAGES.length > PREVIEW_COUNT && (
        <div className="mx-auto max-w-6xl px-4 mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 transition"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Ver menos
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Ver más{remaining ? ` (+${remaining})` : ""}
              </>
            )}
          </button>
        </div>
      )}

      {/* Fullscreen continuo */}
      <FullscreenViewer
        open={open}
        onClose={() => setOpen(false)}
        folder={null}
        images={GALLERY_IMAGES}
        initialIndex={initialIndex}
        altBase="Galería"
        buildSrc={(file) => `/galeria/${file}`}
      />
    </section>
  );
}
