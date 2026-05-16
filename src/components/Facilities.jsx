import * as Icons from "lucide-react";
import SectionTitle from "./SectionTitle";
import { DEFAULT_HOME_CONTENT } from "../content/defaultHomeContent";

function getLucideIcon(name) {
  return Icons?.[name] || Icons.Package;
}

export default function Facilities({
  section = DEFAULT_HOME_CONTENT.facilitiesSection,
  items = DEFAULT_HOME_CONTENT.facilities,
}) {
  const visibleItems = (items || []).filter((item) => item?.visible !== false);

  return (
    <section className="relative py-14 md:py-16">
      <SectionTitle eyebrow={section?.eyebrow} title={section?.title} desc={section?.description} />

      <div className="mx-auto mt-8 max-w-6xl px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map((item) => {
            const Icon = getLucideIcon(item.icon);
            return (
              <div
                key={`${item.icon}-${item.title}`}
                className="group h-full rounded-3xl border border-black/5 bg-white/80 p-5 shadow-[0_10px_30px_-22px_rgba(0,0,0,.35)] ring-1 ring-black/[0.03] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_36px_-24px_rgba(0,0,0,.45)]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-zinc-50 transition group-hover:bg-white">
                    <Icon className="h-5 w-5 text-zinc-700" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold leading-tight text-zinc-900">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
