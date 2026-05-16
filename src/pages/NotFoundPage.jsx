import { Link } from "react-router-dom";
import EmptyState from "../components/app/EmptyState";
import { INICIO } from "../config/rutas";

export default function NotFoundPage() {
  return (
    <div className="px-4 pb-16 pt-28">
      <div className="mx-auto max-w-3xl">
        <EmptyState
          title="No encontramos esa página"
          description="La ruta que buscás no existe o fue movida."
          action={
            <Link
              to={INICIO}
              className="rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Volver al inicio
            </Link>
          }
        />
      </div>
    </div>
  );
}
