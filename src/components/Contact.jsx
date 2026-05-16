import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageCircle, Send, X } from "lucide-react";
import SectionTitle from "./SectionTitle";
import ContactField from "./ContactField";
import ContactTextarea from "./ContactTextarea";
import UnitSelect from "./UnitSelect";
import DateRangeField from "./DateRangeField";
import GuestsPicker from "./GuestsPicker";
import { enviarConsultaMail } from "../services/contact.service.js";
import { notifyError, notifyInfo, notifySuccess, notifyWarning } from "../helpers/notifications";
import { contactSchema } from "../validators/contactSchemas";
import { DEFAULT_HOME_CONTENT } from "../content/defaultHomeContent";

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
  const from = new Date(y1, m1 - 1, d1, 12, 0, 0, 0);
  const to = new Date(y2, m2 - 1, d2, 12, 0, 0, 0);

  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return null;

  const diffDays = Math.round((to - from) / 86400000);
  if (diffDays <= 0) return null;

  return diffDays;
}

export default function Contact({
  content = DEFAULT_HOME_CONTENT.contactSection,
  accommodations = DEFAULT_HOME_CONTENT.accommodations,
}) {
  const phoneE164 = content?.whatsappPhone || DEFAULT_HOME_CONTENT.contactSection.whatsappPhone;
  const emailSubject = content?.emailSubject || DEFAULT_HOME_CONTENT.contactSection.emailSubject;
  const unitOptions = useMemo(() => accommodations.map((item) => item.title), [accommodations]);

  const [showChannelPick, setShowChannelPick] = useState(false);
  const [userNote, setUserNote] = useState("");
  const [sendingMail, setSendingMail] = useState(false);
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
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      unidad: "",
      fechas: { desde: "", hasta: "" },
      personas: { adultos: 1, menores: 0 },
      mensaje: "",
    },
  });

  const unidad = watch("unidad");
  const nombre = watch("nombre");
  const fechas = watch("fechas");
  const personas = watch("personas");
  const dateRangeError = errors.fechas?.desde?.message || errors.fechas?.hasta?.message || errors.fechas?.message;
  const guestError = errors.personas?.adultos?.message || errors.personas?.menores?.message || errors.personas?.message;

  const autoHeader = useMemo(() => {
    const desdeRaw = fechas?.desde || "";
    const hastaRaw = fechas?.hasta || "";
    const desde = formatAR(desdeRaw);
    const hasta = formatAR(hastaRaw);
    const adultos = Number(personas?.adultos ?? 1);
    const menores = Number(personas?.menores ?? 0);

    const lines = [];
    lines.push("Hola. Quiero consultar disponibilidad en Cabanas Tacuifi.");
    lines.push("");

    if (unidad) lines.push(`Unidad: ${unidad}`);
    if (nombre) lines.push(`Nombre: ${nombre}`);

    if (desde || hasta) {
      const rango = [desde, hasta].filter(Boolean).join(" al ");
      const noches = calcNoches(desdeRaw, hastaRaw);
      const nochesTxt = noches ? ` (${noches} noche${noches === 1 ? "" : "s"})` : "";
      lines.push(`Fechas: ${rango}${nochesTxt}`);
    }

    let peopleLine = `Personas: ${adultos} adulto${adultos === 1 ? "" : "s"}`;
    if (menores > 0) peopleLine += ` + ${menores} menor${menores === 1 ? "" : "es"}`;
    lines.push(peopleLine);

    return lines.join("\n").trim();
  }, [unidad, nombre, fechas, personas]);

  const fullMessage = useMemo(() => {
    const note = String(userNote || "").trim();
    return note ? `${autoHeader}\n\n${note}` : `${autoHeader}\n\n`;
  }, [autoHeader, userNote]);

  const sendMessage = useMemo(() => stripEmojis(fullMessage), [fullMessage]);

  useEffect(() => {
    setValue("mensaje", fullMessage, {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [fullMessage, setValue]);

  useEffect(() => {
    const addDays = (dateStr, days) => {
      if (!dateStr) return "";
      const [y, m, d] = dateStr.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      date.setDate(date.getDate() + days);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    const isValidISODate = (dateStr) => {
      if (!dateStr || typeof dateStr !== "string") return false;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
      const [y, m, d] = dateStr.split("-").map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
    };

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

        const fechasIn = data?.fechasPrefill || data?.fechas || null;
        if (!fechasIn) return;

        const desdeRaw = String(fechasIn?.desde || "").trim();
        const hastaRaw = String(fechasIn?.hasta || "").trim();
        const desdeOk = isValidISODate(desdeRaw) ? desdeRaw : "";
        let hastaOk = isValidISODate(hastaRaw) ? hastaRaw : "";

        if (desdeOk && !hastaOk) hastaOk = addDays(desdeOk, 1);
        if (desdeOk && hastaOk && hastaOk <= desdeOk) hastaOk = addDays(desdeOk, 1);

        if (desdeOk || hastaOk) {
          setValue("fechas", { desde: desdeOk, hasta: hastaOk }, { shouldValidate: false, shouldDirty: false });
          setHadPrefill(true);
        }
      } catch {
        return;
      }
    };

    applyPrefill();
    window.addEventListener("contact:prefill", applyPrefill);
    window.addEventListener("hashchange", applyPrefill);

    return () => {
      window.removeEventListener("contact:prefill", applyPrefill);
      window.removeEventListener("hashchange", applyPrefill);
    };
  }, [setValue]);

  const waLink = useMemo(
    () => `https://wa.me/${phoneE164}?text=${encodeURIComponent(sendMessage)}`,
    [phoneE164, sendMessage],
  );

  const onPrimarySubmit = handleSubmit(() => {
    setShowChannelPick(true);
  });

  const sendWhatsApp = () => {
    setShowChannelPick(false);
    const popup = window.open(waLink, "_blank", "noopener,noreferrer");

    if (popup) {
      notifyInfo("WhatsApp listo", "Abrimos tu mensaje en una pestana nueva para que lo revises antes de enviarlo.");
      return;
    }

    notifyWarning("No pudimos abrir WhatsApp", "Tu navegador bloqueo la pestana. Habilita popups y volve a intentar.");
  };

  const sendEmail = async () => {
    try {
      setSendingMail(true);

      await enviarConsultaMail({
        subject: emailSubject,
        name: getValues("nombre"),
        email: getValues("email"),
        phone: getValues("telefono"),
        message: sendMessage,
      });

      await notifySuccess("Consulta enviada", "Te respondemos a la brevedad.");
      setShowChannelPick(false);
      setUserNote("");

      const keepUnidad = hadPrefill ? getValues("unidad") || "" : "";
      const keepPersonas = hadPrefill
        ? getValues("personas") || { adultos: 1, menores: 0 }
        : { adultos: 1, menores: 0 };

      reset(
        {
          nombre: "",
          email: "",
          telefono: "",
          unidad: keepUnidad,
          fechas: { desde: "", hasta: "" },
          personas: keepPersonas,
          mensaje: "",
        },
        { keepErrors: false, keepDirty: false, keepTouched: false },
      );
    } catch (err) {
      const message = err?.message || "No se pudo enviar el email.";
      notifyError("No se pudo enviar", message);
    } finally {
      setSendingMail(false);
    }
  };

  return (
    <section className="relative py-14 md:py-16">
      <SectionTitle eyebrow={content?.eyebrow} title={content?.title} desc={content?.description} />

      <div className="mx-auto mt-8 max-w-6xl px-4">
        <div className="relative rounded-3xl border border-zinc-100/80 bg-white/95 p-6 shadow-xl shadow-zinc-950/10 md:p-7 lg:px-8">
          <p className="font-semibold text-zinc-900">Consulta rapida</p>
          <p className="mt-1 text-sm text-zinc-600">Te pedimos lo minimo para responderte rapido.</p>

          <form className="mt-5 space-y-4" onSubmit={onPrimarySubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <ContactField
                label="Nombre"
                placeholder="Tu nombre"
                error={errors.nombre?.message}
                register={register("nombre", {
                  required: "Decinos tu nombre",
                  minLength: { value: 2, message: "Minimo 2 caracteres" },
                  maxLength: { value: 60, message: "Maximo 60 caracteres" },
                  validate: (value) => (String(value || "").trim().length >= 2 ? true : "Decinos tu nombre"),
                })}
              />

              <ContactField
                label="Email"
                type="email"
                placeholder="tuemail@dominio.com"
                error={errors.email?.message}
                register={register("email", {
                  required: "Decinos tu email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresa un email valido",
                  },
                })}
              />

              <ContactField
                label="Telefono"
                placeholder="+54 9 3546 123456"
                type="tel"
                error={errors.telefono?.message}
                register={register("telefono", {
                  required: "Decinos tu telefono",
                  minLength: { value: 8, message: "Minimo 8 caracteres" },
                  maxLength: { value: 30, message: "Maximo 30 caracteres" },
                  validate: (value) =>
                    /^[0-9+()\-\s]+$/.test(String(value || "").trim())
                      ? true
                      : "Usa solo numeros, espacios y simbolos + - ( )",
                })}
              />

              <Controller
                name="unidad"
                control={control}
                rules={{
                  validate: (value) => (String(value || "").trim().length >= 2 ? true : "Selecciona una unidad"),
                }}
                render={({ field }) => (
                  <UnitSelect
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.unidad?.message}
                    options={unitOptions}
                  />
                )}
              />

              <Controller
                name="fechas"
                control={control}
                rules={{
                  validate: (value) => {
                    const from = value?.desde || "";
                    const to = value?.hasta || "";
                    if (!from || !to) return "Selecciona fecha de entrada y salida";
                    if (to < from) return "La salida no puede ser antes que la entrada";
                    return true;
                  },
                }}
                render={({ field }) => (
                  <DateRangeField value={field.value} onChange={field.onChange} error={dateRangeError} />
                )}
              />

              <Controller
                name="personas"
                control={control}
                rules={{
                  validate: (value) => {
                    const adults = Number(value?.adultos ?? 0);
                    const children = Number(value?.menores ?? 0);
                    if (!Number.isFinite(adults) || adults < 1) return "Indica al menos 1 adulto";
                    if (!Number.isFinite(children) || children < 0) return "Cantidad de menores invalida";
                    if (adults + children > 20) return "Maximo 20 personas. Si son mas, escribinos el detalle.";
                    return true;
                  },
                }}
                render={({ field }) => (
                  <GuestsPicker value={field.value} onChange={field.onChange} error={guestError} />
                )}
              />

              <div className="md:col-span-2">
                <Controller
                  name="mensaje"
                  control={control}
                  render={({ field }) => (
                    <ContactTextarea
                      label="Mensaje"
                      placeholder="El mensaje se arma solo. Escribi tus detalles abajo."
                      error={errors.mensaje?.message}
                      rows={5}
                      name={field.name}
                      onBlur={field.onBlur}
                      inputRef={field.ref}
                      value={field.value || ""}
                      onChange={(event) => {
                        const nextValue = event.target.value || "";
                        const auto = autoHeader.trim();

                        if (nextValue.startsWith(auto)) {
                          setUserNote(nextValue.slice(auto.length).trimStart());
                        } else {
                          setUserNote(nextValue);
                        }

                        field.onChange(nextValue);
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="text-[11px] leading-relaxed text-zinc-500 md:max-w-sm">
                Al enviar, elegis si queres mandarlo por WhatsApp o por email.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-900/20 md:w-auto md:min-w-[220px]"
              >
                <Send className="h-4 w-4" />
                Enviar consulta
              </button>
            </div>
          </form>

          {showChannelPick ? (
            <div
              className="absolute inset-0 grid place-items-center rounded-3xl bg-black/30 p-3 backdrop-blur-[2px] md:p-4"
              onClick={() => setShowChannelPick(false)}
            >
              <div
                className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-5 shadow-lg"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-zinc-900">Como queres enviarlo?</p>
                    <p className="mt-1 text-sm text-zinc-600">Usamos el mismo mensaje del formulario.</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowChannelPick(false)}
                    className="grid h-10 w-10 place-items-center rounded-2xl border border-zinc-200 bg-white hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                    aria-label="Cerrar"
                  >
                    <X className="h-5 w-5 text-zinc-700" />
                  </button>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={sendWhatsApp}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-900/20"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={sendEmail}
                    disabled={sendingMail}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Mail className="h-5 w-5" />
                    {sendingMail ? "Enviando..." : "Email"}
                  </button>
                </div>

                <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
                  WhatsApp abre una pestana nueva. El email se envia desde la web.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
