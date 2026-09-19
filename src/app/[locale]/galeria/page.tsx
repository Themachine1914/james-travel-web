import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { generalGallery, type GalleryItem } from "@/data/gallery";
import { getImageSize } from "@/lib/imageSize";
import { getAllPackages, type Locale } from "@/lib/packages";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/galeria">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "galleryPage" });
  return { title: t("title") };
}

export default async function GalleryPage({
  params,
}: PageProps<"/[locale]/galeria">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("galleryPage");
  const loc = locale as Locale;
  const packages = getAllPackages();

  const packageByImage = new Map(
    packages.flatMap((pkg) => pkg.images.map((src) => [src, pkg] as const))
  );

  const packageImages: GalleryItem[] = packages.flatMap((pkg) =>
    pkg.images.map((src) => ({
      src,
      caption: { es: pkg.title.es, en: pkg.title.en },
    }))
  );

  const seen = new Set<string>();
  const items = [...generalGallery, ...packageImages]
    .filter((item) => {
      if (seen.has(item.src)) return false;
      seen.add(item.src);
      return true;
    })
    .map((item) => ({
      ...item,
      packageId: packageByImage.get(item.src)?.id,
      // Measured at build time so no flyer gets cropped into a fixed box.
      ...getImageSize(item.src),
    }));

  return (
    <section className="pb-16 pt-10 lg:pb-24 lg:pt-14">
      <Container>
        <div className="max-w-[720px]">
          <h1 className="text-[44px] font-extrabold leading-[0.95] tracking-tight text-brand-ink lg:text-[64px]">
            {t("headingTop")}{" "}
            <span className="font-script whitespace-nowrap text-brand-primary">{t("headingScript")}</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-brand-ink-soft lg:text-xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-9 lg:mt-12">
          <GalleryGrid items={items} locale={loc} />
        </div>

        <Link
          href="/paquetes"
          className="mt-10 inline-flex h-14 items-center gap-2.5 rounded-full border-2 border-brand-primary px-7 text-[17px] font-bold text-brand-primary transition-colors hover:bg-brand-primary/5"
        >
          {t("allPackages")}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </Container>
    </section>
  );
}
