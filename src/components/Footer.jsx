import { Phone, Instagram, Facebook } from "lucide-react";
import { useSiteContent } from "../context/SiteContentContext";
import { DEFAULT_HOME_CONTENT } from "../content/defaultHomeContent";
import { formatPhoneHref } from "../helpers/siteContent";

export default function Footer() {
  const { content } = useSiteContent();
  const siteConfig = content?.siteConfig || DEFAULT_HOME_CONTENT.siteConfig;
  const contactSection = content?.contactSection || DEFAULT_HOME_CONTENT.contactSection;

  return (
    <footer className="border-t border-emerald-900/15 bg-[#fbfaf7]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:items-start md:text-left">
          <div>
            <p className="text-sm font-semibold text-zinc-900">{siteConfig.siteName}</p>
            <p className="text-sm text-zinc-600">{siteConfig.locationLabel}</p>

            <a
              href={formatPhoneHref(contactSection.whatsappPhone)}
              className="mt-2 inline-flex items-center gap-2 text-sm text-zinc-700 transition hover:text-emerald-900"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
          </div>

          <div className="flex items-center gap-4">
            {siteConfig.instagramUrl ? (
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:border-emerald-900/40 hover:text-emerald-900"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            ) : null}

            {siteConfig.facebookUrl ? (
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:border-emerald-900/40 hover:text-emerald-900"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="my-6 h-px bg-zinc-200/70" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-zinc-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.siteName}. {siteConfig.footerNote}
          </p>

          {siteConfig.developerLabel && siteConfig.developerUrl ? (
            <a
              href={siteConfig.developerUrl}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-zinc-700"
            >
              {siteConfig.developerLabel}
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
