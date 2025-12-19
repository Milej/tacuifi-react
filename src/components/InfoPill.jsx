const InfoPill = ({ icon: Icon, title, desc }) => {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-2xl bg-amber-900/70 text-white grid place-items-center ring-1 ring-white/10">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}>
            {title}
          </p>
          <p className="text-xs text-white/80 mt-0.5" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPill;
