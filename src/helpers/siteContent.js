const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:4001/api").replace(/\/api$/, "").replace(/\/$/, "");

export function resolveAssetUrl(value) {
  if (!value) return "";
  if (typeof value === "object" && typeof value.url === "string") {
    return resolveAssetUrl(value.url);
  }
  if (String(value).startsWith("http://") || String(value).startsWith("https://")) {
    return String(value);
  }
  if (String(value).startsWith("/uploads/")) {
    return `${API_BASE_URL}${value}`;
  }
  return String(value);
}

export function getImageAlt(imageValue, fallback = "Imagen Tacuifi") {
  if (!imageValue) return fallback;
  if (typeof imageValue === "string") return fallback;
  return imageValue.alt || imageValue.title || fallback;
}

export function buildHomeNavigation(content) {
  const accommodations = Array.isArray(content?.accommodations) ? content.accommodations : [];

  return {
    homeLinks: [
      { label: "Instalaciones", href: "#instalaciones" },
      { label: "Galeria", href: "#galeria" },
      { label: "Promociones", href: "#promociones" },
      { label: "Ubicacion", href: "#ubicacion" },
      { label: "Contacto", href: "#contacto" },
    ],
    unitLinks: accommodations.map((unit) => ({
      label: unit?.title || "Unidad",
      href: `#${unit?.anchorId || unit?.id || "unidad"}`,
    })),
  };
}

export function isPromotionVisible(promotion, now = new Date()) {
  if (!promotion || promotion.isActive === false) {
    return false;
  }

  if (!promotion.startDate && !promotion.endDate) {
    return true;
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const start = promotion.startDate ? new Date(`${promotion.startDate}T00:00:00`).getTime() : null;
  const end = promotion.endDate ? new Date(`${promotion.endDate}T23:59:59`).getTime() : null;

  if (start && Number.isFinite(start) && today < start) {
    return false;
  }

  if (end && Number.isFinite(end) && today > end) {
    return false;
  }

  return true;
}

export function formatPromotionDateLabel(promotion) {
  if (!promotion) return "Fechas a confirmar";
  if (promotion.dateLabel) return promotion.dateLabel;

  const { startDate, endDate } = promotion;

  if (startDate && endDate) {
    return `${startDate} al ${endDate}`;
  }

  if (startDate) {
    return `Desde ${startDate}`;
  }

  if (endDate) {
    return `Hasta ${endDate}`;
  }

  return "Fechas a confirmar";
}

function upsertMetaByName(name, content) {
  const node = document.querySelector(`meta[name="${name}"]`);
  if (node && content) {
    node.setAttribute("content", content);
  }
}

function upsertMetaByProperty(property, content) {
  const node = document.querySelector(`meta[property="${property}"]`);
  if (node && content) {
    node.setAttribute("content", content);
  }
}

export function applySeoContent(content) {
  const seo = content?.seo;
  const siteName = content?.siteConfig?.siteName || "Cabanas Tacuifi";

  if (!seo) {
    return;
  }

  if (seo.pageTitle) {
    document.title = seo.pageTitle;
  }

  upsertMetaByName("description", seo.metaDescription || "");
  upsertMetaByName("keywords", seo.metaKeywords || "");
  upsertMetaByProperty("og:site_name", siteName);
  upsertMetaByProperty("og:title", seo.ogTitle || seo.pageTitle || "");
  upsertMetaByProperty("og:description", seo.ogDescription || seo.metaDescription || "");
  upsertMetaByProperty("og:url", seo.canonicalUrl || window.location.href);
  upsertMetaByProperty("og:image", resolveAssetUrl(seo.ogImage));
  upsertMetaByProperty("og:image:alt", getImageAlt(seo.ogImage, siteName));
  upsertMetaByName("twitter:title", seo.ogTitle || seo.pageTitle || "");
  upsertMetaByName("twitter:description", seo.ogDescription || seo.metaDescription || "");
  upsertMetaByName("twitter:image", resolveAssetUrl(seo.ogImage));

  const canonicalNode = document.querySelector('link[rel="canonical"]');
  if (canonicalNode && seo.canonicalUrl) {
    canonicalNode.setAttribute("href", seo.canonicalUrl);
  }
}

export function formatPhoneHref(phoneValue) {
  return `tel:+${String(phoneValue || "").replace(/[^\d]/g, "")}`;
}
