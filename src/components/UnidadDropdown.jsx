import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function UnidadDropdown({
  label = "Unidades",
  items = [],
  className = "",
  variant = "popover", // "popover" (desktop) | "inline" (mobile)
  onNavigate, // para cerrar menú padre cuando navega (mobile)
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const safeItems = (items || []).filter(Boolean);

  // Cerrar al click afuera SOLO si es popover
  useEffect(() => {
    if (variant !== "popover") return;

    const onDown = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    const onScroll = () => setOpen(false);

    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [variant]);

  // Si cambia el variant (ej. resize), cerramos
  useEffect(() => {
    setOpen(false);
  }, [variant]);

  if (variant === "inline") {
    return (
      <div className={className}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium
                     text-zinc-800 hover:bg-emerald-900/5 transition"
          aria-expanded={open}
        >
          <span>{label}</span>
          <ChevronDown className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`} />
        </button>

        <div
          className={[
            "grid transition-[grid-template-rows,opacity] duration-200",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <div className="mt-2 space-y-1">
              {safeItems.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className="block px-4 py-3 rounded-2xl text-base text-zinc-800
                             hover:bg-emerald-900/5 transition"
                >
                  <div className="font-medium">{it.label}</div>
                  {it.desc && (
                    <div className="text-sm text-zinc-600 leading-snug">{it.desc}</div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // variant === "popover" (desktop)
  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "px-3 py-2 rounded-xl text-sm transition inline-flex items-center gap-1.5",
          "text-zinc-700 hover:text-emerald-900 hover:bg-emerald-900/5",
        ].join(" ")}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={[
            "h-4 w-4 transition",
            open ? "rotate-180 text-emerald-900" : "rotate-0",
          ].join(" ")}
        />
      </button>

      <div
        className={[
          "absolute left-0 top-[calc(100%+10px)] min-w-[260px]",
          "rounded-2xl border border-emerald-900/15 bg-[#fffaf0] shadow-lg",
          "p-2 origin-top",
          "transition-all duration-150",
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none",
        ].join(" ")}
        role="menu"
      >
        {safeItems.map((it) => (
          <a
            key={it.href}
            href={it.href}
            onClick={() => setOpen(false)}
            className="flex flex-col gap-0.5 rounded-xl px-3 py-2 text-sm text-zinc-800
                       hover:bg-emerald-900/5 hover:text-emerald-900 transition"
            role="menuitem"
          >
            <span className="font-medium">{it.label}</span>
            {it.desc && <span className="text-xs text-zinc-600">{it.desc}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}