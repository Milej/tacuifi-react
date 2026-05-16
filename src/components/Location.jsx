import Iframe from "react-iframe";
import SectionTitle from "./SectionTitle";
import { DEFAULT_HOME_CONTENT } from "../content/defaultHomeContent";

export default function Location({ section = DEFAULT_HOME_CONTENT.locationSection }) {
  return (
    <section className="py-14 md:py-20">
      <SectionTitle eyebrow={section?.eyebrow} title={section?.title} desc={section?.description} />

      <div className="mx-auto mt-8 max-w-6xl px-4">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="h-[380px] w-full bg-zinc-100 md:h-[520px] lg:h-[650px]">
            <Iframe
              url={section?.mapEmbedUrl}
              width="100%"
              height="100%"
              className="h-full w-full"
              display="block"
              position="relative"
              loading="lazy"
              styles={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
