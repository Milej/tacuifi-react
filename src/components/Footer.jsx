import { Phone, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-900/15 bg-[#fbfaf7]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Fila principal */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">
          {/* Info del alojamiento */}
          <div>
            <p className="text-sm font-semibold text-zinc-900">Tacuifi - Aparts & Cabañas</p>
            <p className="text-sm text-zinc-600">Los Reartes · Valle de Calamuchita · Córdoba</p>

            {/* Teléfono */}
            <a
              href="tel:+5493510000000"
              className="mt-2 inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-emerald-900 transition"
            >
              <Phone className="h-4 w-4" />
              +54 9 3546 402842
            </a>
          </div>

          {/* Redes */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/tacuifi"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-xl border border-zinc-200 text-zinc-600 hover:text-emerald-900 hover:border-emerald-900/40 transition"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>

            <a
              href="https://www.facebook.com/Tacuifi/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center h-9 w-9 rounded-xl border border-zinc-200 text-zinc-600 hover:text-emerald-900 hover:border-emerald-900/40 transition"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="my-6 h-px bg-zinc-200/70" />

        {/* Fila inferior */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Cabañas Tacuifi. Todos los derechos reservados.</p>

          {/* Footer desarrollador */}
          <a
            href="https://maxemestudio.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-700 transition"
          >
            Desarrollado por · MaxEme Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
