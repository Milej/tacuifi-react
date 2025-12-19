import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function defaultBuildSrc(folder, file) {
  return `/unidades/${folder}/${file}`;
}

export default function FullscreenViewer({
  open,
  onClose,
  folder,
  images = [],
  initialIndex = 0,
  altBase = "Imagen",
  buildSrc, // ✅ NUEVO: si lo pasás, arma la ruta como quieras
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [index, setIndex] = useState(initialIndex);

  const getSrc = useMemo(() => {
    if (typeof buildSrc === "function") {
      return (file) => buildSrc(file, folder);
    }
    return (file) => defaultBuildSrc(folder, file);
  }, [buildSrc, folder]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // al abrir: ir al índice
  useEffect(() => {
    if (!open) return;
    if (!emblaApi) return;

    const safe = Math.max(0, Math.min(initialIndex, images.length - 1));
    emblaApi.scrollTo(safe, true);
    setIndex(safe);

    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [open, emblaApi, initialIndex, images.length]);

  // teclado: ESC cierra, flechas navegan
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, scrollPrev, scrollNext]);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[9999]">
        {/* Overlay MUY oscuro + blur para que sea FULLSCREEN posta */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-120"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm" onClick={onClose} />
        </Transition.Child>

        {/* Contenedor fullscreen */}
        <div className="fixed inset-0">
          <div className="relative h-full w-full">
            {/* “Marco” sutil para separar del overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),transparent_55%)]" />

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
                className="relative mx-auto h-full w-full max-w-7xl px-3 sm:px-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top bar */}
                <div className="absolute left-0 right-0 top-0 z-30 px-3 sm:px-6 pt-3 sm:pt-5">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-white/10 px-3 py-2 text-xs text-white/85 backdrop-blur border border-white/10">
                      {Math.min(index + 1, images.length)} / {images.length}
                    </div>

                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-2xl bg-white/10 p-3 text-white/90 backdrop-blur border border-white/10 hover:bg-white/15 transition"
                      aria-label="Cerrar"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Arrows */}
                <button
                  type="button"
                  onClick={scrollPrev}
                  className={[
                    "absolute left-3 sm:left-6 top-1/2 z-30 -translate-y-1/2",
                    "h-12 w-12 rounded-full",
                    "bg-white/10 text-white backdrop-blur border border-white/10",
                    "shadow-[0_12px_40px_rgba(0,0,0,0.55)]",
                    "grid place-items-center hover:bg-white/15 transition",
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
                    "h-12 w-12 rounded-full",
                    "bg-white/10 text-white backdrop-blur border border-white/10",
                    "shadow-[0_12px_40px_rgba(0,0,0,0.55)]",
                    "grid place-items-center hover:bg-white/15 transition",
                  ].join(" ")}
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Viewer */}
                <div className="relative z-10 flex h-full items-center justify-center py-16 sm:py-20">
                  <div className="w-full">
                    <div
                      ref={emblaRef}
                      className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_30px_120px_rgba(0,0,0,0.75)]"
                    >
                      <div className="flex">
                        {images.map((img, idx) => (
                          <div key={`${String(folder)}-${img}-fs`} className="min-w-0 flex-[0_0_100%]">
                            <div className="flex h-[75vh] sm:h-[80vh] items-center justify-center">
                              <img
                                src={getSrc(img)}
                                alt={`${altBase} - ${idx + 1}`}
                                className="max-h-[75vh] sm:max-h-[80vh] max-w-[95vw] object-contain select-none"
                                draggable={false}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 text-center text-xs text-white/70">ESC para cerrar · ← → para navegar</div>
                  </div>
                </div>

                {/* Click afuera cierra (sin tapar el panel) */}
                <div
                  className="absolute inset-0 -z-10"
                  aria-hidden="true"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) onClose?.();
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
