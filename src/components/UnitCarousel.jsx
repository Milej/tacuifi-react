import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Expand, Loader2 } from "lucide-react";
import FullscreenViewer from "./FullscreenViewer";

function buildImgPath(folder, file) {
  return `/unidades/${folder}/${file}`;
}

export default function UnitCarousel({
  folder,
  images = [],
  altBase = "Unidad",
  className = "",
}) {
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loadedSet, setLoadedSet] = useState(() => new Set());

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  // Sync ACTIVE desde Embla (esto reemplaza tu useEffect que lo pisaba mal)
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActive(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        io.disconnect();
      },
      { root: null, rootMargin: "200px 0px", threshold: 0.1 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const markLoaded = (file) => {
    setLoadedSet((prev) => {
      if (prev.has(file)) return prev;
      const next = new Set(prev);
      next.add(file);
      return next;
    });
  };

  if (!folder || !images?.length) {
    return (
      <div
        className={[
          "rounded-3xl overflow-hidden border border-emerald-900/15 bg-white/40",
          "grid place-items-center aspect-[16/10]",
          className,
        ].join(" ")}
      >
        <p className="text-sm text-zinc-600">Sin imágenes</p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={sectionRef}
        className={[
          "group relative rounded-3xl overflow-hidden border border-emerald-900/15 bg-white/40",
          className,
        ].join(" ")}
      >
        {!shouldLoad && (
          <div className="absolute inset-0 z-30 grid place-items-center bg-white/70 backdrop-blur-[1px]">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white/90 px-3 py-2 text-xs text-zinc-700 shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Cargando imágenes...
            </div>
          </div>
        )}

        {/* Viewport */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {images.map((img, idx) => (
              <div key={`${folder}-${img}`} className="relative min-w-0 flex-[0_0_100%]">
                <button
                  type="button"
                  onClick={() => {
                    // ✅ esto hace que el fullscreen abra SIEMPRE en la imagen clickeada
                    setActive(idx);
                    emblaApi?.scrollTo(idx, true);
                    setOpen(true);
                  }}
                  className="relative block w-full text-left"
                  aria-label="Ver en pantalla completa"
                >
                  <div className="relative aspect-[16/10] bg-black/5">
                    {!loadedSet.has(img) && <div className="absolute inset-0 z-10 animate-pulse bg-zinc-200/80" />}
                    <img
                      src={shouldLoad ? buildImgPath(folder, img) : undefined}
                      alt={`${altBase} - ${idx + 1}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                        loadedSet.has(img) ? "opacity-100" : "opacity-0"
                      }`}
                      loading={idx === active ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={idx === active ? "high" : "low"}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      onLoad={() => markLoaded(img)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />

                    <div className="absolute right-3 top-3 z-10">
                      <div className="flex items-center gap-2 rounded-2xl bg-white/80 border border-white/30 backdrop-blur-md px-3 py-2 shadow-sm">
                        <Expand className="h-4 w-4 text-slate-900" />
                        <span className="text-xs font-medium text-slate-900">Ver</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={scrollPrev}
          className={[
            "absolute left-3 top-1/2 z-20 -translate-y-1/2",
            "h-10 w-10 rounded-full",
            "bg-black/35 backdrop-blur-md border border-white/20",
            "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
            "grid place-items-center",
            "opacity-0 group-hover:opacity-100 focus:opacity-100 transition",
            "hover:bg-black/55 hover:scale-[1.04] active:scale-[0.98]",
          ].join(" ")}
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5 text-white drop-shadow" />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          className={[
            "absolute right-3 top-1/2 z-20 -translate-y-1/2",
            "h-10 w-10 rounded-full",
            "bg-black/35 backdrop-blur-md border border-white/20",
            "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
            "grid place-items-center",
            "opacity-0 group-hover:opacity-100 focus:opacity-100 transition",
            "hover:bg-black/55 hover:scale-[1.04] active:scale-[0.98]",
          ].join(" ")}
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5 text-white drop-shadow" />
        </button>

        {/* Dots */}
        <div className="pointer-events-auto absolute bottom-3 left-1/2 z-20 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full bg-black/20 border border-white/15 px-3 py-2 backdrop-blur">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                className={[
                  "h-2 rounded-full transition-all",
                  i === active ? "w-6 bg-white/95" : "w-2 bg-white/60 hover:bg-white/80",
                ].join(" ")}
                aria-label={`Ir a la imagen ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <FullscreenViewer
        open={open}
        onClose={() => setOpen(false)}
        folder={folder}
        images={images}
        initialIndex={active}
        altBase={altBase}
      />
    </>
  );
}
