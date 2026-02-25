import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { links, unidadesLinks } from "../config/links";
import UnidadDropdown from "../components/UnidadDropdown";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 10;
      setScrolled((prev) => (prev === next ? prev : next)); // ✅ evita rerender por cada pixel
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea scroll del body cuando el menú fullscreen está abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Cerrar si pasa a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const Logo = ({ onClick }) => (
    <a href="#inicio" onClick={onClick} className="flex items-center select-none" aria-label="Ir a inicio">
      <img src="/logo.png" alt="Tacuifi" className="h-11 md:h-12 w-auto object-contain" />
    </a>
  );

  const linkBase = "px-3 py-2 rounded-xl text-sm transition flex items-center";
  const linkIdle = "text-zinc-700 hover:text-emerald-900 hover:bg-emerald-900/5";
  const cta =
    "ml-2 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm bg-emerald-800 text-white hover:bg-emerald-700";

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50",
          // ✅ NO transition-all (evita animar bordes/medidas)
          "transition-colors duration-200",
          // ✅ borde SIEMPRE (no cambia el alto). Solo cambia el color.
          "border-b",
          scrolled ? "bg-[#fbf7ee]/95 backdrop-blur border-emerald-900/10" : "bg-transparent border-transparent",
        ].join(" ")}
      >
        <div className="w-full">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="h-16 flex items-center justify-between">
              <Logo onClick={() => setOpen(false)} />

              {/* Desktop */}
              <nav className="hidden lg:flex items-center gap-1">
                <a href="#inicio" className={`${linkBase} ${linkIdle}`}>
                  Inicio
                </a>

                <UnidadDropdown label="Unidades" items={unidadesLinks} />

                {links
                  .filter((l) => l.href !== "#inicio")
                  .map((l) => (
                    <a key={l.href} href={l.href} className={`${linkBase} ${linkIdle}`}>
                      {l.label}
                    </a>
                  ))}

                <a href="#contacto" className={cta}>
                  Consultar
                </a>
              </nav>

              {/* Mobile toggle */}
              <button
                className={[
                  "lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl",
                  "border border-emerald-900/10 bg-[#fffaf0]/80 backdrop-blur",
                  "hover:bg-[#fffaf0] transition",
                ].join(" ")}
                onClick={() => setOpen(true)}
                aria-label="Abrir menú"
                aria-expanded={open}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MOBILE MENU */}
      <div
        className={[
          "lg:hidden fixed inset-0 z-[60]",
          "transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          className="absolute inset-0 w-full h-full bg-black/35 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú (fondo)"
        />

        {/* Panel full screen */}
        <div className="absolute inset-0 bg-[#fbf7ee] flex flex-col" role="dialog" aria-modal="true">
          {/* Top bar */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-emerald-900/10">
            <Logo onClick={() => setOpen(false)} />

            <button
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-emerald-900/10 bg-white/70 hover:bg-white transition"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-5">
            <div className="max-w-md mx-auto">
              <a
                href="#inicio"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-2xl text-base font-medium text-zinc-800 hover:bg-emerald-900/5 transition"
              >
                Inicio
              </a>

              <div className="mt-2">
                <UnidadDropdown
                  variant="inline"
                  label="Unidades"
                  items={unidadesLinks}
                  onNavigate={() => setOpen(false)}
                />
              </div>

              <div className="mt-2 space-y-1">
                {links
                  .filter((l) => l.href !== "#inicio")
                  .map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-2xl text-base font-medium text-zinc-800 hover:bg-emerald-900/5 transition"
                    >
                      {l.label}
                    </a>
                  ))}
              </div>

              <div className="mt-6">
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-5 py-3 rounded-2xl text-base font-semibold bg-emerald-800 text-white hover:bg-emerald-700 transition"
                >
                  Consultar
                </a>

                <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                  Contanos fechas, cantidad de personas y qué unidad te interesa. Te respondemos rápido.
                </p>
              </div>
            </div>
          </div>

          <div className="h-4" />
        </div>
      </div>
    </>
  );
}
