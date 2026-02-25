import { useEffect, useMemo, useRef, useState } from "react";
import { Images, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
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
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loadedSet, setLoadedSet] = useState(() => new Set());

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        io.disconnect();
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0.1,
      },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const visibleImages = useMemo(() => {
    return showAll ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, PREVIEW_COUNT);
  }, [showAll]);

  const remaining = Math.max(0, GALLERY_IMAGES.length - PREVIEW_COUNT);

  const openAt = (i) => {
    const realIndex = showAll ? i : i;
    setInitialIndex(realIndex);
    setOpen(true);
  };

  const markLoaded = (file) => {
    setLoadedSet((prev) => {
      if (prev.has(file)) return prev;
      const next = new Set(prev);
      next.add(file);
      return next;
    });
  };

  return (
    <section id="galeria" ref={sectionRef} className="relative py-14 md:py-16">
      <SectionTitle
        eyebrow="Galería"
        title="Un vistazo al lugar"
        desc="Tocá cualquier foto para verla en pantalla completa."
      />

      {!shouldLoad ? (
        <div className="mx-auto max-w-6xl px-4 mt-8">
          <div className="rounded-3xl border border-zinc-200/80 bg-white/75 backdrop-blur-sm shadow-sm p-8 md:p-10">
            <div className="flex items-center justify-center gap-3 text-zinc-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p className="text-sm md:text-base">Cargando galería...</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="mx-auto max-w-6xl px-4 mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {visibleImages.map((file, i) => (
              <button
                key={file}
                onClick={() => openAt(i)}
                className="group relative rounded-3xl overflow-hidden border border-zinc-200 bg-white shadow-sm focus:outline-none"
              >
                <div className="aspect-square relative">
                  {!loadedSet.has(file) && <div className="absolute inset-0 animate-pulse bg-zinc-200/80" />}
                  <img
                    src={`/galeria/${file}`}
                    alt={`Galería ${i + 1}`}
                    className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
                      loadedSet.has(file) ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    onLoad={() => markLoaded(file)}
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
        </>
      )}
    </section>
  );
}
