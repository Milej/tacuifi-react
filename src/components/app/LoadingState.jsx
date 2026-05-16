import SurfaceCard from "./SurfaceCard";

export default function LoadingState({ label = "Cargando..." }) {
  return (
    <SurfaceCard className="p-10">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-800/20 border-t-emerald-800" />
        <p className="text-sm text-zinc-600">{label}</p>
      </div>
    </SurfaceCard>
  );
}
