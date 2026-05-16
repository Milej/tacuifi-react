import { useEffect } from "react";
import { X } from "lucide-react";
import AuthFormContent from "./AuthFormContent";

export default function AuthModal({ mode, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-6">
      <button
        type="button"
        aria-label="Cerrar acceso"
        className="absolute inset-0 bg-zinc-950/45 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Acceso a Tacuifi"
        className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/40 bg-[linear-gradient(180deg,#f7f3eb,#ece5d8)] p-5 shadow-2xl md:p-7"
      >
        <div className="mb-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-900/10 bg-white/80 text-zinc-700 transition hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <AuthFormContent mode={mode} onClose={onClose} />
      </div>
    </div>
  );
}
