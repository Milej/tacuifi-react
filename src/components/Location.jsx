import SectionTitle from "./SectionTitle";
import Iframe from "react-iframe";

export default function Location() {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1014.231067499505!2d-64.57806790987982!3d-31.92287474087504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d2b1755b41236f%3A0x26826f7a3b72880f!2sCaba%C3%B1as%20Tacuifi!5e0!3m2!1ses-419!2sar!4v1629501904631!5m2!1ses-419!2sar";

  return (
     <section className="py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* MAPA */}
        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          <div className="w-full h-[380px] md:h-[520px] lg:h-[650px] bg-zinc-100">
            <Iframe
              url={mapEmbedUrl}
              width="100%"
              height="100%"
              className="w-full h-full"
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
