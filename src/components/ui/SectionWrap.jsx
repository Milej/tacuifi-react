export default function SectionWrap({
  id,
  bg = "#ffffff",
  fadeTopFrom,
  fadeBottomTo,
  fadeH = 56,
  className = "",
  children,
}) {
  const showTop = !!fadeTopFrom && fadeTopFrom !== bg;
  const showBottom = !!fadeBottomTo && fadeBottomTo !== bg;

  return (
    <section id={id} className={`relative ${className}`} style={{ backgroundColor: bg }}>
      {showTop && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 z-0"
          style={{
            height: fadeH,
            background: `linear-gradient(to bottom, ${fadeTopFrom}, ${bg})`,
          }}
        />
      )}

      {showBottom && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 bottom-0 z-0"
          style={{
            height: fadeH,
            background: `linear-gradient(to bottom, ${bg}, ${fadeBottomTo})`,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </section>
  );
}
