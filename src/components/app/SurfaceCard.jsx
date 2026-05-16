export default function SurfaceCard({ className = "", children }) {
  return (
    <div
      className={[
        "rounded-[28px] border border-emerald-900/10 bg-white/80 backdrop-blur-sm shadow-[0_15px_45px_rgba(24,24,27,0.06)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
