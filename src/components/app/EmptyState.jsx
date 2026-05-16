import SurfaceCard from "./SurfaceCard";

export default function EmptyState({ title, description, action }) {
  return (
    <SurfaceCard className="p-8 text-center">
      <div className="mx-auto max-w-lg">
        <p className="text-lg font-semibold text-zinc-900">{title}</p>
        {description ? <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p> : null}
        {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
      </div>
    </SurfaceCard>
  );
}
