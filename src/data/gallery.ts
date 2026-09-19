// The order below is the curated opening of the gallery wall; the page
// appends every remaining package flyer and dedupes by src, so the same
// flyer is never shown twice.
export interface GalleryItem {
  src: string;
  caption: { es: string; en: string };
  /** Set by the gallery page so the lightbox can link to the tour. */
  packageId?: string;
  /** Intrinsic size, measured at build time by lib/imageSize. */
  width?: number;
  height?: number;
}

export const generalGallery: GalleryItem[] = [
  {
    src: "/images/packages/tour-sur-profundo/flyer.jpg",
    caption: { es: "Tour Sur Profundo", en: "Deep South Tour" },
  },
  {
    src: "/images/packages/san-juan-elias-pina-pedernales/flyer.jpg",
    caption: { es: "San Juan, Elías Piña y Pedernales", en: "San Juan, Elías Piña & Pedernales" },
  },
  {
    src: "/images/packages/otono-europeo/flyer.jpg",
    caption: { es: "Otoño Europeo", en: "European Autumn" },
  },
  {
    src: "/images/packages/atractivos-samana/flyer.jpg",
    caption: { es: "Atractivos de Samaná", en: "Samaná Highlights" },
  },
  {
    src: "/images/packages/ballenas-jorobadas/flyer.jpg",
    caption: { es: "Ballenas jorobadas", en: "Humpback whales" },
  },
  {
    src: "/images/packages/egipto-semana-santa/flyer.jpg",
    caption: { es: "Semana Santa en Egipto", en: "Easter Week in Egypt" },
  },
];
