import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/home/Hero";
import { DestinationsTicker } from "@/components/home/DestinationsTicker";
import { UpcomingDepartures } from "@/components/home/UpcomingDepartures";
import { TypeTiles } from "@/components/home/TypeTiles";
import { ToursCatalog } from "@/components/home/ToursCatalog";
import { HowToBook } from "@/components/home/HowToBook";
import { ContactBand } from "@/components/home/ContactBand";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <DestinationsTicker />
      <UpcomingDepartures />
      <TypeTiles />
      <ToursCatalog />
      <HowToBook />
      <ContactBand />
    </>
  );
}
