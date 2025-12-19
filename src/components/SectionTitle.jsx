export default function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-xs uppercase tracking-widest text-zinc-500">{eyebrow}</p>
        )}
        <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        {desc && <p className="mt-2 text-zinc-700 leading-relaxed">{desc}</p>}
      </div>
    </div>
  );
}
