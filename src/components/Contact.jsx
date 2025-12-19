import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

import { Mail, Send, MessageCircle, X } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ContactField from "./ContactField";
import ContactTextarea from "./ContactTextarea";

import UnitSelect from "./UnitSelect";
import DateRangeField from "./DateRangeField";
import GuestsPicker from "./GuestsPicker";

// 👇 service frontend
import { enviarConsultaMail } from "../services/contact.service.js";

// Convierte YYYY-MM-DD -> DD/MM/AAAA (Argentina)
function formatAR(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

function stripEmojis(text = "") {
  return text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");
}

function calcNoches(desdeISO, hastaISO) {
  if (!desdeISO || !hastaISO) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(desdeISO) || !/^\d{4}-\d{2}-\d{2}$/.test(hastaISO)) return null;

  const [y1, m1, d1] = desdeISO.split("-").map(Number);
  const [y2, m2, d2] = hastaISO.split("-").map(Number);

  // mediodía local para evitar temas de DST/horas
  const a = new Date(y1, m1 - 1, d1, 12, 0, 0, 0);
  const b = new Date(y2, m2 - 1, d2, 12, 0, 0, 0);

  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;

  const diffDays = Math.round((b - a) / 86400000);
  if (diffDays <= 0) return null;

  return diffDays; // noches = diferencia en días
}

export default function Contact() {
  const phoneE164 = "5493546402842";
  const emailTo = "consultas@tacuifi.com.ar";
  const emailSubject = "Consulta de disponibilidad - Cabañas Tacuifi";

  const [showChannelPick, setShowChannelPick] = useState(false);

  // Nota editable del usuario (persistente, no se pisa nunca)
  const [userNote, setUserNote] = useState("");

  // estado envío email (sin abrir mail app)
  const [sendingMail, setSendingMail] = useState(false);
  const [mailOk, setMailOk] = useState(false);
  const [mailErr, setMailErr] = useState("");

  // si vino prefill desde Units, lo mantenemos tras limpiar por email
  const [hadPrefill, setHadPrefill] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      nombre: "",
      unidad: "",
      fechas: { desde: "", hasta: "" },
      personas: { adultos: 1, menores: 0 },
      mensaje: "",
    },
  });

  // -----------------------------
  // Watchers (lo que arma el header)
  // -----------------------------
  const unidad = watch("unidad");
  const nombre = watch("nombre");
  const fechas = watch("fechas");
  const personas = watch("personas");

  // -----------------------------
  // Header autogenerado (SIEMPRE se recalcula con campos)
  // -----------------------------
  const autoHeader = useMemo(() => {
    const desdeRaw = fechas?.desde || "";
    const hastaRaw = fechas?.hasta || "";

    const desde = formatAR(desdeRaw);
    const hasta = formatAR(hastaRaw);

    const adultos = Number(personas?.adultos ?? 1);
    const menores = Number(personas?.menores ?? 0);

    const lines = [];
    lines.push("Hola! Quiero consultar disponibilidad en Cabañas Tacuifi.");
    lines.push("");

    if (unidad) lines.push(`🏡 Unidad: ${unidad}`);
    if (nombre) lines.push(`👤 Nombre: ${nombre}`);

    if (desde || hasta) {
      const rango = [desde, hasta].filter(Boolean).join(" al ");

      const noches = calcNoches(desdeRaw, hastaRaw);
      const nochesTxt = noches ? ` (${noches} noche${noches === 1 ? "" : "s"})` : "";

      lines.push(`📅 Fechas: ${rango}${nochesTxt}`);
    }

    let ppl = `👥 Personas: ${adultos} adulto${adultos === 1 ? "" : "s"}`;
    if (menores > 0) ppl += ` + ${menores} menor${menores === 1 ? "" : "es"}`;
    lines.push(ppl);

    return lines.join("\n").trim();
  }, [unidad, nombre, fechas, personas]);

  // Mensaje final (lo visible en el textarea y lo que se envía)
  const fullMessage = useMemo(() => {
    const note = String(userNote || "").trim();
    return note ? `${autoHeader}\n\n${note}` : `${autoHeader}\n\n`;
  }, [autoHeader, userNote]);

  // ✅ lo que se envía por WA/Email (sin emojis)
  const sendMessage = useMemo(() => stripEmojis(fullMessage), [fullMessage]);

  // Mantener RHF “mensaje” sincronizado (sin ensuciar)
  useEffect(() => {
    setValue("mensaje", fullMessage, {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [fullMessage, setValue]);

  // -----------------------------
  // Prefill desde Units (sessionStorage + evento)
  // -----------------------------
  useEffect(() => {
    const applyPrefill = () => {
      try {
        const raw = sessionStorage.getItem("contact_prefill");
        if (!raw) return;
        const data = JSON.parse(raw);

        if (data?.unidadTitle) {
          setValue("unidad", data.unidadTitle, { shouldValidate: false, shouldDirty: false });
          setHadPrefill(true);
        }

        if (data?.personasPrefill) {
          setValue("personas", data.personasPrefill, { shouldValidate: false, shouldDirty: false });
          setHadPrefill(true);
        }

        if (data?.message) {
          // si en algún momento querés enchufar esto a userNote:
          // setUserNote(String(data.message || ""));
        }
      } catch (e) {}
    };

    applyPrefill();
    window.addEventListener("contact:prefill", applyPrefill);
    window.addEventListener("hashchange", applyPrefill);

    return () => {
      window.removeEventListener("contact:prefill", applyPrefill);
      window.removeEventListener("hashchange", applyPrefill);
    };
  }, [setValue]);

  // -----------------------------
  // Links
  // -----------------------------
  const waLink = useMemo(
    () => `https://wa.me/${phoneE164}?text=${encodeURIComponent(sendMessage)}`,
    [phoneE164, sendMessage]
  );

  // 1) Submit: valida y abre selector
  const onPrimarySubmit = handleSubmit(() => {
    setMailOk(false);
    setMailErr("");
    setShowChannelPick(true);
  });

  // 2) Acciones finales
  const sendWhatsApp = () => {
    setShowChannelPick(false);
    window.open(waLink, "_blank");
  };

  const sendEmail = async () => {
    setMailOk(false);
    setMailErr("");

    try {
      setSendingMail(true);

      await enviarConsultaMail({
        to: emailTo,
        subject: emailSubject,
        message: sendMessage, // SIN emojis
      });

      setMailOk(true);

      // ✅ SweetAlert OK
      await Swal.fire({
        icon: "success",
        title: "Consulta enviada",
        text: "Te respondemos a la brevedad.",
        confirmButtonText: "Listo",
        confirmButtonColor: "#18181b", // zinc-900
      });

      // ✅ cerrar modal
      setShowChannelPick(false);

      // ✅ limpiar nota manual
      setUserNote("");

      // ✅ resetear formulario SOLO cuando EMAIL sale OK
      // si venía prefill, mantenemos unidad/personas
      const keepUnidad = hadPrefill ? getValues("unidad") || "" : "";
      const keepPersonas = hadPrefill
        ? getValues("personas") || { adultos: 1, menores: 0 }
        : { adultos: 1, menores: 0 };

      reset(
        {
          nombre: "",
          unidad: keepUnidad,
          fechas: { desde: "", hasta: "" },
          personas: keepPersonas,
          mensaje: "",
        },
        { keepErrors: false, keepDirty: false, keepTouched: false }
      );
    } catch (err) {
      const msg = err?.message || "No se pudo enviar el email.";
      setMailErr(msg);

      // ❌ SweetAlert ERROR
      await Swal.fire({
        icon: "error",
        title: "No se pudo enviar",
        text: msg,
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#18181b",
      });
    } finally {
      setSendingMail(false);
    }
  };

  return (
    <section id="contacto" className="relative py-14 md:py-16">
      {/* Fondo suave */}
      <div className="absolute inset-0 -z-10 bg-white" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.07),transparent_55%),radial-gradient(circle_at_82%_28%,rgba(14,165,233,0.06),transparent_50%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#fbfaf7] via-white to-white" />

      <SectionTitle
        eyebrow="Contacto"
        title="Consultas y reservas"
        desc="Completá el form y enviá tu consulta en 10 segundos."
      />

      <div className="mx-auto max-w-6xl px-4 mt-8">
        <div className="relative rounded-3xl border border-zinc-200/80 bg-white/70 backdrop-blur-sm shadow-sm p-6">
          <p className="font-semibold text-zinc-900">Consulta rápida</p>
          <p className="text-sm text-zinc-600 mt-1">Te pedimos lo mínimo para responderte rápido.</p>

          <form className="mt-5 space-y-4" onSubmit={onPrimarySubmit}>
            <ContactField
              label="Nombre"
              placeholder="Tu nombre"
              error={errors.nombre?.message}
              register={register("nombre", {
                required: "Decinos tu nombre",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 60, message: "Máximo 60 caracteres" },
                validate: (v) => (String(v || "").trim().length >= 2 ? true : "Decinos tu nombre"),
              })}
            />

            {/* ✅ Unidad */}
            <Controller
              name="unidad"
              control={control}
              rules={{
                validate: (v) => (String(v || "").trim().length >= 2 ? true : "Seleccioná una unidad"),
              }}
              render={({ field }) => (
                <UnitSelect value={field.value} onChange={field.onChange} error={errors.unidad?.message} />
              )}
            />

            {/* ✅ Fechas */}
            <Controller
              name="fechas"
              control={control}
              rules={{
                validate: (v) => {
                  const d = v?.desde || "";
                  const h = v?.hasta || "";
                  if (!d || !h) return "Seleccioná fecha de entrada y salida";
                  if (h < d) return "La salida no puede ser antes que la entrada";
                  return true;
                },
              }}
              render={({ field }) => (
                <DateRangeField value={field.value} onChange={field.onChange} error={errors.fechas?.message} />
              )}
            />

            {/* ✅ Personas */}
            <Controller
              name="personas"
              control={control}
              rules={{
                validate: (v) => {
                  const a = Number(v?.adultos ?? 0);
                  const m = Number(v?.menores ?? 0);
                  if (!Number.isFinite(a) || a < 1) return "Indicá al menos 1 adulto";
                  if (!Number.isFinite(m) || m < 0) return "Menores inválido";
                  if (a + m > 20) return "Máximo 20 personas (si son más, escribinos el detalle)";
                  return true;
                },
              }}
              render={({ field }) => (
                <GuestsPicker value={field.value} onChange={field.onChange} error={errors.personas?.message} />
              )}
            />

            {/* ✅ Mensaje */}
            <Controller
              name="mensaje"
              control={control}
              render={({ field }) => (
                <ContactTextarea
                  label="Mensaje"
                  placeholder="El mensaje se arma solo. Escribí tus detalles abajo."
                  error={errors.mensaje?.message}
                  rows={7}
                  name={field.name}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  value={field.value || ""}
                  onChange={(e) => {
                    const v = e.target.value || "";

                    const auto = autoHeader.trim();
                    if (v.startsWith(auto)) {
                      const rest = v.slice(auto.length).trimStart();
                      setUserNote(rest);
                    } else {
                      setUserNote(v);
                    }

                    field.onChange(v);
                  }}
                />
              )}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl bg-zinc-900 text-white font-semibold text-sm hover:bg-zinc-800 transition disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-zinc-900/20"
            >
              <Send className="h-4 w-4" />
              Enviar consulta
            </button>

            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Al enviar, elegís si lo mandás por WhatsApp o Email.
            </p>
          </form>

          {/* Selector de canal */}
          {showChannelPick && (
            <div
              className="absolute inset-0 rounded-3xl bg-black/30 backdrop-blur-[2px] p-3 md:p-4 grid place-items-center"
              onClick={() => setShowChannelPick(false)}
            >
              <div
                className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white shadow-lg p-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-zinc-900">¿Cómo querés enviar?</p>
                    <p className="text-sm text-zinc-600 mt-1">Usamos el mismo mensaje del formulario.</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowChannelPick(false)}
                    className="h-10 w-10 rounded-2xl border border-zinc-200 bg-white hover:bg-zinc-50 grid place-items-center focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                    aria-label="Cerrar"
                  >
                    <X className="h-5 w-5 text-zinc-700" />
                  </button>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={sendWhatsApp}
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl bg-emerald-800 text-white font-semibold text-sm hover:bg-emerald-700 transition focus:outline-none focus:ring-2 focus:ring-emerald-900/20"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={sendEmail}
                    disabled={sendingMail}
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl bg-zinc-900 text-white font-semibold text-sm hover:bg-zinc-800 transition focus:outline-none focus:ring-2 focus:ring-zinc-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Mail className="h-5 w-5" />
                    {sendingMail ? "Enviando..." : "Email"}
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-zinc-500 leading-relaxed">
                  WhatsApp abre una pestaña nueva. Email se envía desde la web.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
