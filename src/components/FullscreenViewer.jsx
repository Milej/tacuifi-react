import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";

function defaultBuildSrc(folder, file) {
  return `/unidades/${folder}/${file}`;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

export default function FullscreenViewer({
  open,
  onClose,
  folder,
  images = [],
  initialIndex = 0,
  altBase = "Imagen",
  buildSrc,
  loop = true,
  showDots = true,
  preloadNeighbors = true,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: Boolean(loop),
    align: "center",
    containScroll: "trimSnaps",
  });

  const [index, setIndex] = useState(0);
  const [loadedMap, setLoadedMap] = useState(() => new Map());

  const panelRef = useRef(null);

  const getSrc = useMemo(() => {
    if (typeof buildSrc === "function") return (file) => buildSrc(file, folder);
    return (file) => defaultBuildSrc(folder, file);
  }, [buildSrc, folder]);

  const count = images?.length ?? 0;
  const canNav = count > 1;

  const safeInitial = useMemo(() => clamp(initialIndex ?? 0, 0, Math.max(0, count - 1)), [initialIndex, count]);

  const setLoaded = useCallback((idx) => {
    setLoadedMap((prev) => {
      const next = new Map(prev);
      next.set(idx, true);
      return next;
    });
  }, []);

  const isLoaded = useCallback((idx) => loadedMap.get(idx) === true, [loadedMap]);

  const handleClose = useCallback(() => onClose?.(), [onClose]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi || !canNav) return;
    emblaApi.scrollPrev();
  }, [emblaApi, canNav]);

  const scrollNext = useCallback(() => {
    if (!emblaApi || !canNav) return;
    emblaApi.scrollNext();
  }, [emblaApi, canNav]);

  const scrollTo = useCallback(
    (idx) => {
      if (!emblaApi || !canNav) return;
      emblaApi.scrollTo(idx);
    },
    [emblaApi, canNav],
  );

  // Sync al abrir
  useEffect(() => {
    if (!open) return;
    if (!emblaApi) return;

    emblaApi.scrollTo(safeInitial, true);
    setIndex(safeInitial);

    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [open, emblaApi, safeInitial]);

  // Preload vecinos
  useEffect(() => {
    if (!open) return;
    if (!preloadNeighbors) return;
    if (!count) return;

    const targets = new Set([index]);
    if (count > 1) {
      targets.add((index - 1 + count) % count);
      targets.add((index + 1) % count);
    }

    targets.forEach((i) => {
      const src = getSrc(images[i]);
      const img = new Image();
      img.src = src;
    });
  }, [open, preloadNeighbors, index, count, images, getSrc]);

  // Teclado
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose, scrollPrev, scrollNext]);

  // Focus al abrir
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => panelRef.current?.focus?.(), 0);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={handleClose} className="relative z-[9999]">
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-120"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="relative h-full w-full">
            {/* glow suave */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.12),transparent_55%)]" />

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-0 translate-y-1 scale-[0.99]"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-120"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-1 scale-[0.99]"
            >
              <Dialog.Panel
                ref={panelRef}
                tabIndex={-1}
                className="relative mx-auto h-full w-full max-w-7xl px-3 sm:px-6 outline-none"
              >
                {/* Top bar (más legible) */}
                <div className="absolute left-0 right-0 top-0 z-30 px-3 sm:px-6 pt-3 sm:pt-5">
                  <div className="flex items-center justify-between gap-3">
                    {/* contador FULL blanco */}
                    <div
                      className={[
                        "rounded-2xl px-3 py-2 text-xs",
                        "text-white font-medium",
                        "bg-black/55 backdrop-blur",
                        "border border-white/15",
                        "shadow-[0_10px_30px_rgba(0,0,0,0.55)]",
                      ].join(" ")}
                    >
                      {count ? `${Math.min(index + 1, count)} / ${count}` : "0 / 0"}
                    </div>

                    <button
                      type="button"
                      onClick={handleClose}
                      className={[
                        "rounded-2xl p-3",
                        "text-white",
                        "bg-black/55 backdrop-blur",
                        "border border-white/15",
                        "shadow-[0_10px_30px_rgba(0,0,0,0.55)]",
                        "hover:bg-black/65 transition",
                        "focus:outline-none focus:ring-2 focus:ring-white/30",
                      ].join(" ")}
                      aria-label="Cerrar"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Arrows */}
                {canNav && (
                  <>
                    <button
                      type="button"
                      onClick={scrollPrev}
                      className={[
                        "absolute left-3 sm:left-6 top-1/2 z-30 -translate-y-1/2",
                        "h-12 w-12 rounded-full grid place-items-center",
                        "text-white",
                        "bg-black/55 backdrop-blur",
                        "border border-white/15",
                        "shadow-[0_12px_40px_rgba(0,0,0,0.55)]",
                        "hover:bg-black/65 transition",
                        "focus:outline-none focus:ring-2 focus:ring-white/30",
                      ].join(" ")}
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                      type="button"
                      onClick={scrollNext}
                      className={[
                        "absolute right-3 sm:right-6 top-1/2 z-30 -translate-y-1/2",
                        "h-12 w-12 rounded-full grid place-items-center",
                        "text-white",
                        "bg-black/55 backdrop-blur",
                        "border border-white/15",
                        "shadow-[0_12px_40px_rgba(0,0,0,0.55)]",
                        "hover:bg-black/65 transition",
                        "focus:outline-none focus:ring-2 focus:ring-white/30",
                      ].join(" ")}
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Viewer */}
                <div className="relative z-10 flex h-full items-center justify-center py-16 sm:py-20">
                  <div className="w-full">
                    <div
                      ref={emblaRef}
                      className="overflow-hidden rounded-3xl border border-white/10 bg-black/35 shadow-[0_30px_120px_rgba(0,0,0,0.75)] select-none"
                    >
                      <div className="flex">
                        {images.map((img, idx) => {
                          const src = getSrc(img);
                          const loaded = isLoaded(idx);

                          return (
                            <div key={`${String(folder)}-${img}-fs`} className="min-w-0 flex-[0_0_100%]">
                              <div className="relative flex h-[75vh] sm:h-[80vh] items-center justify-center">
                                {!loaded && (
                                  <div className="absolute inset-0 grid place-items-center">
                                    <div className="flex items-center gap-2 rounded-2xl bg-black/55 px-3 py-2 text-xs text-white border border-white/15 backdrop-blur">
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                      Cargando…
                                    </div>
                                  </div>
                                )}

                                <img
                                  src={src}
                                  alt={`${altBase} - ${idx + 1}`}
                                  className={[
                                    "max-h-[75vh] sm:max-h-[80vh] max-w-[95vw] object-contain",
                                    "transition duration-200",
                                    loaded ? "opacity-100" : "opacity-0",
                                  ].join(" ")}
                                  draggable={false}
                                  loading={idx === index ? "eager" : "lazy"}
                                  onLoad={() => setLoaded(idx)}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dots */}
                    {showDots && canNav && (
                      <div className="mt-4 flex items-center justify-center gap-2">
                        {images.map((_, i) => {
                          const active = i === index;
                          return (
                            <button
                              key={`dot-${i}`}
                              type="button"
                              onClick={() => scrollTo(i)}
                              className={[
                                "h-2.5 rounded-full transition",
                                active ? "w-6 bg-white/80" : "w-2.5 bg-white/30 hover:bg-white/45",
                                "focus:outline-none focus:ring-2 focus:ring-white/30",
                              ].join(" ")}
                              aria-label={`Ir a imagen ${i + 1}`}
                            />
                          );
                        })}
                      </div>
                    )}

                    {/* Hint FULL blanco (legible) */}
                    <div className="mt-3 text-center text-xs text-white/90">
                      ESC para cerrar {canNav ? "· ← → para navegar" : ""}
                    </div>
                  </div>
                </div>

                {/* Click afuera cierra */}
                <div
                  className="absolute inset-0 -z-10"
                  aria-hidden="true"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) handleClose();
                  }}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
