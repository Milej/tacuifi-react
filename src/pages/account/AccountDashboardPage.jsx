import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageBanner from "../../components/app/PageBanner";
import SurfaceCard from "../../components/app/SurfaceCard";
import StatCard from "../../components/app/StatCard";
import LoadingState from "../../components/app/LoadingState";
import EmptyState from "../../components/app/EmptyState";
import { getAccountDashboard } from "../../services/account.service";
import { formatCurrency, formatDate, getFullName } from "../../helpers/formatters";
import { notifyError } from "../../helpers/notifications";
import { MI_RESERVAS, buildHomeSectionPath } from "../../config/rutas";

export default function AccountDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAccountDashboard()
      .then(setData)
      .catch((error) => notifyError("No se pudo cargar tu espacio", error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingState label="Cargando tu espacio..." />;
  }

  if (!data) {
    return <EmptyState title="No se pudo cargar tu espacio" description="Intenta nuevamente en unos instantes." />;
  }

  const nextReservation = data.nextReservation;
  const reservations = data.reservations || [];
  const upcomingReservations = reservations.filter((item) => ["pending", "confirmed"].includes(item.status));

  return (
    <>
      <PageBanner
        eyebrow="Mi espacio"
        title={`Hola${getFullName(data.user?.profile) ? `, ${data.user.profile.firstName}` : ""}`}
        description="Un resumen de tu perfil y tus reservas en Tacuifi."
        actions={
          <>
            <Link
              to={MI_RESERVAS}
              className="rounded-2xl border border-emerald-900/10 bg-white/70 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-white"
            >
              Ver reservas
            </Link>
            <Link
              to={buildHomeSectionPath("contacto")}
              className="rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Hacer una consulta
            </Link>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Reservas" value={reservations.length || 0} detail="Proximas estadias e historial." accent="sand" />
        <StatCard label="Reservas activas" value={upcomingReservations.length} detail="Pendientes o confirmadas." accent="deep" />
        <StatCard
          label="Proximo check-in"
          value={nextReservation ? formatDate(nextReservation.startDate) : "Sin reservas"}
          detail={nextReservation ? nextReservation.accommodation.name : "Aun no tienes una estadia cargada."}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard className="p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Actividad reciente</p>
            <h2 className="mt-3 text-2xl font-semibold text-zinc-900">
              {upcomingReservations.length > 0 ? "Tus proximas estadias" : "Aun no tienes reservas activas"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {upcomingReservations.length > 0
                ? "Revisa fechas, montos y estado de las reservas que siguen vigentes."
                : "Cuando registres una reserva, la veras resumida aqui."}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {upcomingReservations.length > 0 ? (
              upcomingReservations.slice(0, 3).map((reservation) => (
                <div key={reservation.id} className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-zinc-900">{reservation.accommodation.name}</p>
                      <p className="mt-1 text-sm text-zinc-600">
                        {formatDate(reservation.startDate)} al {formatDate(reservation.endDate)}
                      </p>
                    </div>
                    <p className="font-semibold text-zinc-900">{formatCurrency(reservation.totalAmount)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 px-5 py-5">
                <p className="text-sm leading-relaxed text-zinc-600">Puedes crear una reserva desde tu panel o escribirnos desde la portada.</p>
              </div>
            )}
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Proxima reserva</p>
          {nextReservation ? (
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-lg font-semibold text-zinc-900">{nextReservation.accommodation.name}</p>
                <p className="mt-1 text-sm text-zinc-600">
                  {formatDate(nextReservation.startDate)} al {formatDate(nextReservation.endDate)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Total</p>
                  <p className="mt-2 font-semibold text-zinc-900">{formatCurrency(nextReservation.totalAmount)}</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Descuento</p>
                  <p className="mt-2 font-semibold text-zinc-900">{formatCurrency(nextReservation.discountAmount)}</p>
                </div>
              </div>
              <p className="text-sm text-zinc-600">Estado: {nextReservation.status}</p>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 px-5 py-5">
              <p className="text-lg font-semibold text-zinc-900">Todavia no tienes reservas</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">Cuando reserves, veras el resumen aqui.</p>
              <div className="mt-5">
                <Link
                  to={MI_RESERVAS}
                  className="inline-flex rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Nueva reserva
                </Link>
              </div>
            </div>
          )}
        </SurfaceCard>
      </div>
    </>
  );
}
