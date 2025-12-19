import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { links, unidadesLinks } from "../config/links";
import UnidadDropdown from "../components/UnidadDropdown";
import UnidadDropdownMobile from "../components/UnidadDropdownMobile";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const Logo = () => (
    <a href="#inicio" className="flex items-center select-none" aria-label="Ir a inicio">
      <img src="/logo.png" alt="Tacuifi" className="h-12 md:h-14 w-auto object-contain scale-110 origin-left" />
    </a>
  );

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-200",
        scrolled ? "bg-[#fbf7ee]/90 backdrop-blur border-b border-emerald-900/15" : "bg-transparent",
      ].join(" ")}
    >
      <div
        className={[
          "h-[2px] w-full",
          scrolled ? "bg-gradient-to-r from-emerald-700 via-amber-800 to-emerald-700 opacity-70" : "bg-transparent",
        ].join(" ")}
      />

      <div className="mx-auto max-w-6xl px-4">
        <div className="h-16 flex items-center justify-between">
          <Logo />

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Inicio */}
            <a
              href="#inicio"
              className="px-3 py-2 rounded-xl text-sm transition text-zinc-700 hover:text-emerald-900 hover:bg-emerald-900/5"
            >
              Inicio
            </a>

            {/* Dropdown Unidades */}
            <UnidadDropdown label="Unidades" items={unidadesLinks} />

            {/* Resto links */}
            {links
              .filter((l) => l.href !== "#inicio")
              .map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-3 py-2 rounded-xl text-sm transition text-zinc-700 hover:text-emerald-900 hover:bg-emerald-900/5"
                >
                  {l.label}
                </a>
              ))}

            <a
              href="#contacto"
              className="ml-2 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm bg-emerald-800 text-white hover:bg-emerald-700"
            >
              Consultar
            </a>
          </nav>

          {/* Mobile */}
          <button
            className={[
              "lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl",
              "border border-emerald-900/15 bg-[#fffaf0]/70 backdrop-blur",
              "hover:bg-[#fffaf0] transition",
            ].join(" ")}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="lg:hidden pb-4">
            <div className="rounded-2xl border border-emerald-900/15 bg-[#fffaf0] shadow-sm p-2">
              <a
                href="#inicio"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm text-zinc-700 hover:text-emerald-900 hover:bg-emerald-900/5 transition"
              >
                Inicio
              </a>

              {/* Unidades (mobile dropdown) */}
              <UnidadDropdownMobile
                label="Unidades"
                items={unidadesLinks.map(({ label, href }) => ({ label, href }))}
                onNavigate={() => setOpen(false)}
              />

              {links
                .filter((l) => l.href !== "#inicio")
                .map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-xl text-sm text-zinc-700 hover:text-emerald-900 hover:bg-emerald-900/5 transition"
                  >
                    {l.label}
                  </a>
                ))}

              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-2 block text-center px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-800 text-white hover:bg-emerald-700 transition"
              >
                Consultar
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
