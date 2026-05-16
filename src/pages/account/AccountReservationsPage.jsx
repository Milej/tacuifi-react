import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageBanner from "../../components/app/PageBanner";
import SurfaceCard from "../../components/app/SurfaceCard";
import LoadingState from "../../components/app/LoadingState";
import StatusBadge from "../../components/app/StatusBadge";
import DateRangeField from "../../components/DateRangeField";
import GuestsPicker from "../../components/GuestsPicker";
import { createReservation, getAccountDashboard, quoteReservation } from "../../services/account.service";
import { notifyError, notifySuccess } from "../../helpers/notifications";
import { formatCurrency, formatDate } from "../../helpers/formatters";
import { reservationFormSchema } from "../../validators/accountSchemas";

const defaultValues = {
  accommodationId: "",
  fechas: { desde: "", hasta: "" },
  personas: { adultos: 2, menores: 0 },
  notes: "",
};

export default function AccountReservationsPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const form = useForm({
    resolver: zodResolver(reservationFormSchema),
    defaultValues,
  });

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setLoading(true);
    getAccountDashboard()
      .then((data) => setDashboard(data))
      .catch((error) => notifyError("No se pudieron cargar tus reservas", error.message))
      .finally(() => setLoading(false));
  }

  const accommodations = dashboard?.accommodations || [];
  const reservations = dashboard?.reservations || [];
  const futureReservations = reservations.filter((item) => ["pending", "confirmed"].includes(item.status));
  const historyReservations = reservations.filter((item) => !["pending", "confirmed"].includes(item.status));
  const dateError =
    form.formState.errors.fechas?.desde?.message ||
    form.formState.errors.fechas?.hasta?.message ||
    form.formState.errors.fechas?.message;
  const guestsError =
    form.formState.errors.personas?.adultos?.message ||
    form.formState.errors.personas?.menores?.message ||
    form.formState.errors.personas?.message;

  async function handleQuote(values) {
    try {
      const result = await quoteReservation({
        accommodationId: values.accommodationId,
        startDate: values.fechas.desde,
        endDate: values.fechas.hasta,
        guestCount: Number(values.personas.adultos) + Number(values.personas.menores),
        notes: values.notes,
      });
      setQuote(result);
    } catch (error) {
      notifyError("No se pudo cotizar la reserva", error.message);
    }
  }

  async function handleReservation(values) {
    try {
      const result = await createReservation({
        accommodationId: values.accommodationId,
        startDate: values.fechas.desde,
        endDate: values.fechas.hasta,
        guestCount: Number(values.personas.adultos) + Number(values.personas.menores),
        notes: values.notes,
      });
      await notifySuccess("Reserva creada", `Tu reserva quedo registrada con el codigo ${result.reservationId}.`);
      setQuote(null);
      form.reset(defaultValues);
      loadData();
    } catch (error) {
      notifyError("No se pudo crear la reserva", error.message);
    }
  }

  if (loading) {
    return <LoadingState label="Cargando reservas..." />;
  }

  return (
    <>
      <PageBanner
        eyebrow="Mis reservas"
        title="Reserva tu estadia"
        description="Cotiza tu estadia y revisa el total antes de confirmar."
        compact
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SurfaceCard className="p-6">
          <h2 className="text-xl font-semibold text-zinc-900">Nueva reserva</h2>
          <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(handleQuote)}>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Alojamiento</span>
              <select
                {...form.register("accommodationId")}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-emerald-800/30 focus:ring-2 focus:ring-emerald-900/10"
              >
                <option value="">Elegi una opcion</option>
                {accommodations.map((accommodation) => (
                  <option key={accommodation.id} value={accommodation.id}>
                    {accommodation.name}
                  </option>
                ))}
              </select>
              {form.formState.errors.accommodationId?.message ? (
                <span className="mt-1.5 block text-xs text-rose-600">{form.formState.errors.accommodationId.message}</span>
              ) : null}
            </label>

            <Controller
              control={form.control}
              name="fechas"
              render={({ field }) => <DateRangeField value={field.value} onChange={field.onChange} error={dateError} />}
            />

            <Controller
              control={form.control}
              name="personas"
              render={({ field }) => <GuestsPicker value={field.value} onChange={field.onChange} error={guestsError} />}
            />

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Observaciones</span>
              <textarea
                rows={4}
                {...form.register("notes")}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-emerald-800/30 focus:ring-2 focus:ring-emerald-900/10"
              />
              {form.formState.errors.notes?.message ? (
                <span className="mt-1.5 block text-xs text-rose-600">{form.formState.errors.notes.message}</span>
              ) : null}
            </label>

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              {form.formState.isSubmitting ? "Consultando..." : "Cotizar reserva"}
            </button>
          </form>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          <h2 className="text-xl font-semibold text-zinc-900">Cotizacion</h2>
          {quote ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
                <p className="text-lg font-semibold text-zinc-900">{quote.accommodation.name}</p>
                <p className="mt-2 text-sm text-zinc-600">
                  Capacidad {quote.accommodation.capacity} · {quote.pricing.nights} noche{quote.pricing.nights === 1 ? "" : "s"}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Tarifa base</p>
                  <p className="mt-2 font-semibold text-zinc-900">{formatCurrency(quote.pricing.baseAmount)}</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Descuento</p>
                  <p className="mt-2 font-semibold text-zinc-900">{formatCurrency(quote.pricing.discountAmount)}</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Total final</p>
                  <p className="mt-2 font-semibold text-zinc-900">{formatCurrency(quote.pricing.totalAmount)}</p>
                </div>
              </div>

              <p className="text-sm text-zinc-600">Descuento aplicado: {quote.pricing.discountReason || "Sin descuentos"}</p>

              <button
                type="button"
                onClick={form.handleSubmit(handleReservation)}
                className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Confirmar reserva
              </button>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 px-5 py-5">
              <p className="text-lg font-semibold text-zinc-900">Todavia no cotizaste una reserva</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">Completa el formulario para ver el detalle.</p>
            </div>
          )}
        </SurfaceCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SurfaceCard className="p-6">
          <h2 className="text-xl font-semibold text-zinc-900">Proximas reservas</h2>
          <div className="mt-6 space-y-3">
            {futureReservations.length > 0 ? (
              futureReservations.map((reservation) => (
                <div key={reservation.id} className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-zinc-900">{reservation.accommodation.name}</p>
                      <p className="mt-1 text-sm text-zinc-600">
                        {formatDate(reservation.startDate)} al {formatDate(reservation.endDate)}
                      </p>
                      <p className="mt-2 text-sm text-zinc-600">Descuento aplicado: {reservation.discountReason || "Sin descuento"}</p>
                    </div>
                    <StatusBadge status={reservation.status}>{reservation.status}</StatusBadge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500">No hay reservas activas.</p>
            )}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          <h2 className="text-xl font-semibold text-zinc-900">Historial</h2>
          <div className="mt-6 space-y-3">
            {historyReservations.length > 0 ? (
              historyReservations.map((reservation) => (
                <div key={reservation.id} className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-zinc-900">{reservation.accommodation.name}</p>
                      <p className="mt-1 text-sm text-zinc-600">
                        {formatDate(reservation.startDate)} al {formatDate(reservation.endDate)}
                      </p>
                      <p className="mt-2 text-sm text-zinc-600">Total: {formatCurrency(reservation.totalAmount)}</p>
                    </div>
                    <StatusBadge status={reservation.status}>{reservation.status}</StatusBadge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500">Todavia no hay historial.</p>
            )}
          </div>
        </SurfaceCard>
      </div>
    </>
  );
}
