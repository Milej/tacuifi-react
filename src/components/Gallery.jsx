import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Images, Loader2 } from "lucide-react";
import SectionTitle from "./SectionTitle";
import FullscreenViewer from "./FullscreenViewer";
import { DEFAULT_HOME_CONTENT } from "../content/defaultHomeContent";
import { getImageAlt, resolveAssetUrl } from "../helpers/siteContent";

export default function Gallery({
  section = DEFAULT_HOME_CONTENT.gallerySection,
  items = DEFAULT_HOME_CONTENT.galleryItems,
}) {
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
      }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const visibleItems = useMemo(
    () =>
      (Array.isArray(items) ? items : [])
        .filter((item) => item?.visible !== false)
        .slice()
        .sort((left, right) => Number(left?.sortOrder ?? 0) - Number(right?.sortOrder ?? 0)),
    [items]
  );
  const previewCount = section?.previewCount || DEFAULT_HOME_CONTENT.gallerySection.previewCount;
  const visibleImages = useMemo(
    () => (showAll ? visibleItems : visibleItems.slice(0, previewCount)),
    [visibleItems, previewCount, showAll]
  );
  const remaining = Math.max(0, visibleItems.length - previewCount);

  const openAt = (index) => {
    setInitialIndex(index);
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
      <SectionTitle eyebrow={section?.eyebrow} title={section?.title} desc={section?.description} />

      {!shouldLoad ? (
        <div className="mx-auto mt-8 max-w-6xl px-4">
          <div className="rounded-3xl border border-zinc-200/80 bg-white/75 p-8 shadow-sm backdrop-blur-sm md:p-10">
            <div className="flex items-center justify-center gap-3 text-zinc-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p className="text-sm md:text-base">Cargando galeria...</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-3 px-4 md:grid-cols-4">
            {visibleImages.map((item, index) => {
              const imageUrl = resolveAssetUrl(item?.image);
              const imageAlt = getImageAlt(item?.image, `Galeria ${index + 1}`);

              return (
              <button
                key={item?.id || imageUrl}
                onClick={() => openAt(index)}
                className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm focus:outline-none"
              >
                <div className="relative aspect-square">
                  {!loadedSet.has(imageUrl) ? <div className="absolute inset-0 animate-pulse bg-zinc-200/80" /> : null}
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
                      loadedSet.has(imageUrl) ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    onLoad={() => markLoaded(imageUrl)}
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
                <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-zinc-900 shadow">
                    <Images className="h-4 w-4" />
                    Ver
                  </div>
                </div>
              </button>
              );
            })}
          </div>

          {visibleItems.length > previewCount ? (
            <div className="mx-auto mt-6 flex max-w-6xl justify-center px-4">
              <button
                type="button"
                onClick={() => setShowAll((value) => !value)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Ver menos
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Ver mas{remaining ? ` (+${remaining})` : ""}
                  </>
                )}
              </button>
            </div>
          ) : null}

          <FullscreenViewer
            open={open}
            onClose={() => setOpen(false)}
            folder={null}
            images={visibleItems.map((item) => item.image)}
            initialIndex={initialIndex}
            altBase="Galeria"
            buildSrc={(image) => resolveAssetUrl(image)}
          />
        </>
      )}
    </section>
  );
}
