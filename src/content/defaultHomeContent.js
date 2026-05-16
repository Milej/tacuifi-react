function createImage(url, title = "", alt = "") {
  return {
    assetId: null,
    url,
    title,
    alt: alt || title,
  };
}

function createUnitImages(folder, total, label) {
  const images = [];

  for (let index = 1; index <= total; index += 1) {
    images.push(createImage(`/unidades/${folder}/${index}.jpg`, `${label} ${index}`, `${label} - vista ${index}`));
  }

  return images;
}

function createGalleryImages(total) {
  const items = [];

  for (let index = 1; index <= total; index += 1) {
    items.push({
      id: `gallery-${index}`,
      sortOrder: index - 1,
      visible: true,
      image: createImage(`/galeria/${index}.jpg`, `Galeria ${index}`, `Galeria Tacuifi ${index}`),
    });
  }

  return items;
}

export const DEFAULT_HOME_CONTENT = {
  hero: {
    title: "Tacuifi",
    subtitle: "Aparts y cabanas - Los Reartes",
    description: "Un lugar tranquilo para descansar, cerca del rio y de todo lo que hace especial a Los Reartes.",
    backgroundImage: createImage("/hero.jpg", "Hero principal", "Vista principal de Tacuifi"),
    primaryButtonLabel: "Consultar",
    primaryButtonTarget: "contacto",
  },
  accommodations: [
    {
      id: "apartamento",
      anchorId: "apartamentos",
      title: "Apartamento",
      subtitle: "Para 2-3 personas",
      description:
        "Habitacion de 25 m2 construida en una planta. Cuenta con sommier doble, bano privado, pequena galeria, cochera cubierta con media sombra y asador con parrilla.",
      images: createUnitImages("apart", 17, "Apartamento"),
      equipment: [
        { name: 'Smart TV 50"', icon: "Tv" },
        { name: "Vajilla", icon: "Coffee" },
        { name: "Heladera bajo mesada", icon: "Refrigerator" },
        { name: "Microondas", icon: "Microwave" },
        { name: "Pava electrica", icon: "Kettle" },
        { name: "Tender", icon: "Shirt" },
      ],
      links: {
        turismomax: "https://turismomax.com/nueva-reserva/cabanas-tacuifi?unidad=1",
        booking: "https://www.booking.com/Share-VkSF97",
      },
      defaultGuests: {
        adultos: 2,
        menores: 0,
      },
    },
    {
      id: "piedra",
      anchorId: "cabanas-de-piedra",
      title: "Cabana de piedra",
      subtitle: "Hasta 4 personas",
      description:
        "Cabana de 50 m2 construida en una planta. Cuenta con dos dormitorios (1 dormitorio sommier doble - 2 dormitorio dos sommiers simples), bano, cocina-comedor, galeria-cochera y asador con parrilla individual.",
      images: createUnitImages("cabana", 24, "Cabana de piedra"),
      equipment: [
        { name: 'Smart TV 32"', icon: "Tv" },
        { name: "Vajilla completa", icon: "Coffee" },
        { name: "Heladera con congelador", icon: "Refrigerator" },
        { name: "Tender", icon: "Shirt" },
      ],
      links: {
        turismomax: "https://turismomax.com/nueva-reserva/cabanas-tacuifi?unidad=2",
        booking: "",
      },
      defaultGuests: {
        adultos: 2,
        menores: 1,
      },
    },
  ],
  facilitiesSection: {
    eyebrow: "Instalaciones",
    title: "Exterior y servicios",
    description: "Todo lo esencial para una estadia comoda.",
  },
  facilities: [
    { icon: "Trees", title: "Parque amplio", description: "Espacios verdes para descansar y disfrutar del aire libre.", visible: true },
    { icon: "Waves", title: "Piscina", description: "Un lugar para aflojar y pasar la tarde.", visible: true },
    { icon: "Flame", title: "Asadores", description: "Parrillas listas para compartir un buen asado.", visible: true },
    { icon: "Car", title: "Estacionamiento", description: "Lugar comodo para dejar el auto.", visible: true },
    { icon: "ShieldCheck", title: "Entorno tranquilo", description: "Un ambiente sereno para descansar de verdad.", visible: true },
    { icon: "Sparkles", title: "Limpieza", description: "Espacios cuidados, prolijos y listos para recibirte.", visible: true },
    { icon: "Baby", title: "Ideal para familias", description: "Un entorno practico para venir en grupo.", visible: true },
    { icon: "MapPin", title: "Ubicacion practica", description: "Cerca de todo, sin perder tranquilidad.", visible: true },
  ],
  gallerySection: {
    eyebrow: "Galeria",
    title: "Un vistazo al lugar",
    description: "Recorre algunos rincones de Tacuifi.",
    previewCount: 8,
  },
  galleryItems: createGalleryImages(20),
  promotionsSection: {
    eyebrow: "Promociones",
    title: "Promos vigentes",
    description: "Estas son las promociones disponibles en este momento.",
    emptyTitle: "Por ahora no hay promociones publicadas",
    emptyDescription: "Igual podes consultarnos y vemos la mejor opcion para tus fechas.",
  },
  promotions: [
    {
      id: "default-promo-3x2",
      title: "Promo 3x2",
      description: "Pagas 2 noches y disfrutas 1 mas. Ideal para escapadas entre semana.",
      highlightText: "3x2",
      disclaimer: "No valida para finde largo",
      ctaLabel: "Consultar promo",
      unitId: "apartamento",
      image: null,
      dateLabel: "Todo el ano (segun disponibilidad)",
      startDate: null,
      endDate: null,
      isActive: true,
      sortOrder: 0,
    },
    {
      id: "default-promo-jubilados",
      title: "10% OFF Jubilados",
      description: "Un beneficio especial para jubilados con acreditacion al llegar.",
      highlightText: "10% OFF",
      disclaimer: "No valida para finde largo",
      ctaLabel: "Consultar promo",
      unitId: "piedra",
      image: null,
      dateLabel: "Todo el ano (segun disponibilidad)",
      startDate: null,
      endDate: null,
      isActive: true,
      sortOrder: 1,
    },
    {
      id: "default-promo-larga-estadia",
      title: "Estadias largas (+5 noches)",
      description: "Tarifa especial para quienes se quedan mas tiempo.",
      highlightText: "Larga estadia",
      disclaimer: "No valida para finde largo",
      ctaLabel: "Consultar promo",
      unitId: "piedra",
      image: null,
      dateLabel: "Todo el ano (segun disponibilidad)",
      startDate: null,
      endDate: null,
      isActive: true,
      sortOrder: 2,
    },
  ],
  locationSection: {
    eyebrow: "Ubicacion",
    title: "Donde estamos",
    description: "Estamos en Los Reartes, en una zona tranquila y de facil acceso.",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1014.231067499505!2d-64.57806790987982!3d-31.92287474087504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d2b1755b41236f%3A0x26826f7a3b72880f!2sCaba%C3%B1as%20Tacuifi!5e0!3m2!1ses-419!2sar!4v1629501904631!5m2!1ses-419!2sar",
  },
  contactSection: {
    eyebrow: "Contacto",
    title: "Consultas y reservas",
    description: "Escribinos y te respondemos a la brevedad.",
    whatsappPhone: "5493546402842",
    emailSubject: "Consulta de disponibilidad - Cabanas Tacuifi",
  },
  seo: {
    pageTitle: "Cabanas Tacuifi | Alojamiento en Los Reartes, Cordoba",
    metaDescription:
      "Cabanas Tacuifi: alojamiento en Los Reartes, Cordoba. A 8 km de Villa General Belgrano. Piscina, WiFi y estacionamiento para una estadia comoda.",
    metaKeywords: "cabanas los reartes, alojamiento valle de calamuchita, tacuifi, apart los reartes",
    ogTitle: "Cabanas Tacuifi | Los Reartes, Cordoba",
    ogDescription:
      "Descanso, naturaleza y comodidad en Los Reartes. Cabanas Tacuifi, a 8 km de Villa General Belgrano. Piscina, WiFi y mascotas permitidas.",
    canonicalUrl: "https://tacuifi.com.ar/",
    ogImage: createImage("/logo-transparente.png", "Logo Tacuifi", "Logo de Cabanas Tacuifi"),
  },
  siteConfig: {
    siteName: "Cabanas Tacuifi",
    locationLabel: "Los Reartes · Valle de Calamuchita · Cordoba",
    phoneDisplay: "+54 9 3546 402842",
    instagramUrl: "https://www.instagram.com/tacuifi",
    facebookUrl: "https://www.facebook.com/Tacuifi/",
    footerNote: "Todos los derechos reservados.",
    developerLabel: "Desarrollado por · MaxEme Studio",
    developerUrl: "https://maxemestudio.com",
    floatingWhatsappMessage: "Hola. Quiero consultar disponibilidad o precios para mi estadia.",
    floatingWhatsappStatus: "Respondemos en minutos",
    floatingWhatsappPlaceholder: "Escribe tu consulta aqui...",
  },
};
