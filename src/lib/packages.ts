import packagesData from "@/data/packages.json";

export type Locale = "es" | "en";
export type LocalizedText = { es: string; en: string };
export type LocalizedList = { es: string[]; en: string[] };
export type PackageType = "nacional" | "internacional";

export interface TravelPackage {
  id: string;
  type: PackageType;
  featured: boolean;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  duration: LocalizedText;
  dates: LocalizedText;
  price: { adult: number; child: number | null; currency: string };
  includes: LocalizedList;
  excludes?: LocalizedList;
  destinations: LocalizedList;
  /** Original flyer(s) from the client. */
  images: string[];
  /** Clean photo used on cards and detail pages. */
  cover: string;
  /** CSS object-position for cropping the cover in cards (default: center). */
  coverPosition?: string;
  /** Optional extra photos for the detail page (first one is the main photo). */
  gallery?: string[];
  /** ISO date of the next confirmed departure, when there is one. */
  departsOn?: string;
}

const packages = packagesData as TravelPackage[];

export function getAllPackages(): TravelPackage[] {
  return packages;
}

export function getPackagesByType(type: PackageType): TravelPackage[] {
  return packages.filter((pkg) => pkg.type === type);
}

export function getFeaturedPackages(): TravelPackage[] {
  return packages.filter((pkg) => pkg.featured);
}

/** Packages with a confirmed upcoming departure, soonest first. */
export function getUpcomingPackages(): TravelPackage[] {
  return packages
    .filter((pkg) => pkg.departsOn)
    .sort((a, b) => (a.departsOn ?? "").localeCompare(b.departsOn ?? ""));
}

/** Lowest adult price among packages of a type, with its currency. */
export function getStartingPrice(type: PackageType): { amount: number; currency: string } | null {
  const list = getPackagesByType(type);
  if (list.length === 0) return null;
  const cheapest = list.reduce((min, pkg) => (pkg.price.adult < min.price.adult ? pkg : min));
  return { amount: cheapest.price.adult, currency: cheapest.price.currency };
}

export function getDepartureParts(iso: string, locale: Locale) {
  const date = new Date(`${iso}T12:00:00`);
  const month = new Intl.DateTimeFormat(locale === "es" ? "es-DO" : "en-US", { month: "short" })
    .format(date)
    .replace(".", "");
  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: month.charAt(0).toUpperCase() + month.slice(1),
  };
}

export function getPackageById(id: string): TravelPackage | undefined {
  return packages.find((pkg) => pkg.id === id);
}

export function getRelatedPackages(pkg: TravelPackage, limit = 3): TravelPackage[] {
  return packages.filter((p) => p.id !== pkg.id && p.type === pkg.type).slice(0, limit);
}

export function formatPrice(amount: number, currency = "USD", locale: Locale = "es") {
  const n = new Intl.NumberFormat(locale === "es" ? "es-DO" : "en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
  if (currency === "DOP") return `RD$${n}`;
  if (currency === "USD") return `US$${n}`;
  return `${currency} ${n}`;
}
