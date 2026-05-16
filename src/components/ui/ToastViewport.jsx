import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { subscribeNotifications } from "../../helpers/notifications";

const TOAST_THEME = {
  success: {
    icon: CheckCircle2,
    iconClassName: "text-emerald-900",
    cardClassName: "border-emerald-900/15 bg-[var(--tacuifi-surface-solid)] shadow-[0_12px_30px_rgba(20,83,45,0.08)]",
    badgeClassName: "bg-emerald-900/8 text-emerald-900 ring-1 ring-emerald-900/12",
    progressClassName: "bg-emerald-900/55",
    label: "Exito",
  },
  error: {
    icon: XCircle,
    iconClassName: "text-rose-800",
    cardClassName: "border-rose-900/15 bg-[var(--tacuifi-surface-solid)] shadow-[0_12px_30px_rgba(127,29,29,0.08)]",
    badgeClassName: "bg-rose-900/8 text-rose-900 ring-1 ring-rose-900/12",
    progressClassName: "bg-rose-800/55",
    label: "Error",
  },
  info: {
    icon: Info,
    iconClassName: "text-zinc-800",
    cardClassName: "border-zinc-900/10 bg-[var(--tacuifi-surface-solid)] shadow-[0_12px_30px_rgba(24,24,27,0.08)]",
    badgeClassName: "bg-zinc-900/7 text-zinc-800 ring-1 ring-zinc-900/10",
    progressClassName: "bg-zinc-800/50",
    label: "Info",
  },
  warning: {
    icon: AlertTriangle,
    iconClassName: "text-amber-700",
    cardClassName: "border-amber-900/15 bg-[var(--tacuifi-surface-solid)] shadow-[0_12px_30px_rgba(146,64,14,0.08)]",
    badgeClassName: "bg-amber-700/10 text-amber-800 ring-1 ring-amber-700/14",
    progressClassName: "bg-amber-700/55",
    label: "Atencion",
  },
};

export default function ToastViewport() {
  const [toasts, setToasts] = useState([]);
  const timeoutMapRef = useRef(new Map());

  useEffect(() => {
    const stopListening = subscribeNotifications((toast) => {
      setToasts((current) => [...current.slice(-3), toast]);

      const timeoutId = window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== toast.id));
        timeoutMapRef.current.delete(toast.id);
      }, toast.duration);

      timeoutMapRef.current.set(toast.id, timeoutId);
    });

    return () => {
      stopListening();
      timeoutMapRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutMapRef.current.clear();
    };
  }, []);

  const dismissToast = (toastIdToRemove) => {
    const timeoutId = timeoutMapRef.current.get(toastIdToRemove);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutMapRef.current.delete(toastIdToRemove);
    }

    setToasts((current) => current.filter((item) => item.id !== toastIdToRemove));
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-4 top-20 z-[90] flex flex-col gap-2.5 sm:left-auto sm:right-5 sm:w-full sm:max-w-[22rem]"
    >
      {toasts.map((toast) => {
        const theme = TOAST_THEME[toast.type] || TOAST_THEME.info;
        const Icon = theme.icon;

        return (
          <article
            key={toast.id}
            className={[
              "pointer-events-auto relative overflow-hidden rounded-2xl border px-3.5 py-3 backdrop-blur-sm",
              "tacuifi-toast-enter",
              theme.cardClassName,
            ].join(" ")}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm shadow-black/5 ring-1 ring-black/5">
                <Icon className={["h-4.5 w-4.5", theme.iconClassName].join(" ")} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em]",
                      theme.badgeClassName,
                    ].join(" ")}
                  >
                    {theme.label}
                  </span>
                </div>

                <p className="mt-1.5 text-sm font-semibold leading-5 text-zinc-950">{toast.title}</p>

                {toast.text ? (
                  <p className="mt-0.5 text-[13px] leading-5 text-zinc-600">{toast.text}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-900/5 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                aria-label="Cerrar notificacion"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-zinc-900/6">
              <div
                className={["h-full origin-left rounded-full", theme.progressClassName, "tacuifi-toast-progress"].join(" ")}
                style={{ animationDuration: `${toast.duration}ms` }}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
