import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { PackageCard } from "@/components/packages/PackageCard";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { business } from "@/data/business";
import {
  getAllPackages,
  getPackageById,
  getRelatedPackages,
  formatPrice,
  type Locale,
} from "@/lib/packages";

export function generateStaticParams() {
  const packages = getAllPackages();
  return routing.locales.flatMap((locale) =>
    packages.map((pkg) => ({ locale, slug: pkg.id }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/paquetes/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const pkg = getPackageById(slug);
  if (!pkg) return {};
  return {
    title: pkg.title[locale as Locale],
    description: pkg.summary[locale as Locale],
    openGraph: { images: [{ url: pkg.cover }] },
  };
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export default async function PackageDetailPage({
  params,
}: PageProps<"/[locale]/paquetes/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const pkg = getPackageById(slug);
  if (!pkg) notFound();

  const loc = locale as Locale;
  const t = await getTranslations("packageDetail");
  const tc = await getTranslations("common");
  const related = getRelatedPackages(pkg);
  const whatsappMessage = t("whatsappMessage", { title: pkg.title[loc] });
  const gallery = pkg.gallery ?? [pkg.cover];
  const [mainPhoto, ...morePhotos] = gallery;
  const stops = pkg.destinations[loc];

  // Accent the last word of short titles in the hand-lettered face.
  const words = pkg.title[loc].split(" ");
  const accentTitle = words.length >= 2 && words.length <= 4;
  const titleHead = accentTitle ? words.slice(0, -1).join(" ") : pkg.title[loc];
  const titleAccent = accentTitle ? words[words.length - 1] : "";

  return (
    <section className="pb-16 pt-8 lg:pb-24 lg:pt-10">
      <Container>
        <Link
          href="/paquetes"
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-ink-soft hover:text-brand-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          {t("backToPackages")}
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          {/* Title and photos */}
          <div className="flex min-w-0 flex-col gap-10 lg:col-start-1 lg:row-start-1">
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-wrap gap-2.5">
                <span className="flex h-[34px] items-center rounded-full bg-brand-primary-dark px-4 text-[13px] font-bold uppercase tracking-[0.06em] text-white">
                  {pkg.type === "internacional" ? tc("international") : tc("national")}
                </span>
                {pkg.departsOn && (
                  <span className="flex h-[34px] items-center rounded-full bg-brand-accent px-4 text-[13px] font-bold uppercase tracking-[0.06em] text-brand-ink">
                    {tc("confirmedDeparture")}
                  </span>
                )}
              </div>
              <h1 className="text-[44px] font-extrabold leading-none tracking-tight text-brand-ink lg:text-[68px]">
                {titleHead}
                {titleAccent && (
                  <>
                    {" "}
                    <span className="font-script text-brand-primary">{titleAccent}</span>
                  </>
                )}
              </h1>
              <p className="max-w-[720px] text-lg leading-relaxed text-brand-ink-soft lg:text-xl">
                {pkg.summary[loc]}
              </p>
            </div>

            {/* Photos */}
            {morePhotos.length > 0 ? (
              <div
                className="grid gap-3.5"
                style={{ gridTemplateColumns: `repeat(${gallery.length - 1}, minmax(0, 1fr))` }}
              >
                <div
                  style={{ gridColumn: "1 / -1" }}
                  className="relative h-[260px] overflow-hidden rounded-[28px] bg-brand-primary lg:h-[400px]"
                >
                  <Image src={mainPhoto} alt={pkg.title[loc]} fill priority sizes="(min-width: 1024px) 740px, 100vw" className="object-cover" />
                </div>
                {morePhotos.map((src, i) => (
                  <div key={src} className="relative h-[100px] overflow-hidden rounded-[20px] bg-brand-primary lg:h-[140px]">
                    <Image src={src} alt={`${pkg.title[loc]} ${i + 2}`} fill sizes="240px" className="object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative h-[260px] overflow-hidden rounded-[28px] bg-brand-primary lg:h-[400px]">
                <Image
                  src={mainPhoto}
                  alt={pkg.title[loc]}
                  fill
                  priority
                  sizes="(min-width: 1024px) 740px, 100vw"
                  style={{ objectPosition: pkg.coverPosition ?? "50% 50%" }}
                  className="object-cover"
                />
              </div>
            )}

          </div>

          {/* Description, route and inclusions */}
          <div className="flex min-w-0 flex-col gap-10 lg:col-start-1 lg:row-start-2">
            <p className="text-lg leading-relaxed text-brand-ink/80">{pkg.description[loc]}</p>

            {/* Route */}
            {stops.length > 0 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-[32px] font-extrabold leading-none text-brand-ink lg:text-4xl">
                  {t("route")}
                </h2>
                <p className="text-[17px] leading-relaxed text-brand-ink-soft">
                  {t("routeIntro", { count: stops.length })}
                </p>
                <ol className="flex flex-wrap gap-3">
                  {stops.map((stop, i) => (
                    <li
                      key={stop}
                      className="flex h-11 items-center gap-2.5 rounded-full border-[1.5px] border-[#d9e2f0] bg-white pl-3 pr-[18px] text-[15px] font-semibold text-brand-ink"
                    >
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-brand-accent text-xs font-extrabold text-brand-ink">
                        {i + 1}
                      </span>
                      {stop}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Includes */}
            <div className="flex flex-col gap-5">
              <h2 className="text-[32px] font-extrabold leading-none text-brand-ink lg:text-4xl">
                {tc("includes")}
              </h2>
              <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-3.5">
                {pkg.includes[loc].map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-[18px] bg-white px-4 py-3.5 text-[15px] font-semibold text-brand-ink lg:px-[18px] lg:py-4 lg:text-base">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              {pkg.excludes && pkg.excludes[loc].length > 0 && (
                <div className="mt-2">
                  <h3 className="text-xl font-bold text-brand-ink">{tc("excludes")}</h3>
                  <ul className="mt-3 flex flex-col gap-1.5 text-base text-brand-ink-soft">
                    {pkg.excludes[loc].map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Booking card */}
          <aside className="lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            <div className="flex flex-col gap-6 rounded-[28px] bg-white p-6 shadow-[0_1px_0_#efe8d6,0_30px_60px_-30px_rgba(20,49,90,0.4)] lg:rounded-[32px] lg:p-9">
              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand-gold-deep">
                  {tc("pricePerPerson")}
                </span>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-heading text-[44px] font-extrabold leading-none text-brand-primary lg:text-[52px]">
                    {formatPrice(pkg.price.adult, pkg.price.currency, loc)}
                  </span>
                  <span className="text-[15px] text-brand-ink-soft">{tc("adult").toLowerCase()}</span>
                </div>
                <span className="text-brand-ink-soft">
                  <b className="font-heading text-2xl text-brand-ink">
                    {pkg.price.child !== null
                      ? formatPrice(pkg.price.child, pkg.price.currency, loc)
                      : tc("consult")}
                  </b>{" "}
                  <span className="text-[15px]">{tc("child").toLowerCase()}</span>
                </span>
              </div>

              <dl className="border-t border-[#efe8d6]">
                <div className="flex items-center gap-3.5 border-b border-[#efe8d6] py-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#eef2f8] text-brand-primary">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
                      <path d="M3.5 10h17M8 3v4M16 3v4" />
                    </svg>
                  </span>
                  <div>
                    <dt className="text-[13px] text-brand-ink-soft">{tc("dates")}</dt>
                    <dd className="text-[17px] font-bold text-brand-ink">{pkg.dates[loc]}</dd>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 border-b border-[#efe8d6] py-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#eef2f8] text-brand-primary">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.5" />
                      <path d="M12 7.5V12l3 2" />
                    </svg>
                  </span>
                  <div>
                    <dt className="text-[13px] text-brand-ink-soft">{tc("duration")}</dt>
                    <dd className="text-[17px] font-bold text-brand-ink">{pkg.duration[loc]}</dd>
                  </div>
                </div>
              </dl>

              <div className="flex flex-col gap-3">
                <WhatsAppButton message={whatsappMessage} variant="navy" className="h-[60px] text-lg">
                  {tc("bookViaWhatsapp")}
                </WhatsAppButton>
                <a
                  href={`tel:${business.phones[0]}`}
                  className="flex h-14 items-center justify-center rounded-full border-2 border-brand-primary text-[17px] font-bold text-brand-primary transition-colors hover:bg-brand-primary/5"
                >
                  {t("callButton", { phone: business.phones[0] })}
                </a>
                {pkg.images[0] && (
                  <a
                    href={pkg.images[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-sm font-semibold text-brand-ink-soft underline-offset-4 hover:text-brand-primary hover:underline"
                  >
                    {tc("seeFlyer")}
                  </a>
                )}
              </div>

              <div className="flex flex-col gap-1.5 rounded-[20px] bg-brand-surface px-5 py-[18px]">
                <span className="font-heading text-[17px] font-bold text-brand-ink">{t("howToPayTitle")}</span>
                <span className="text-[15px] leading-normal text-brand-ink-soft">{t("howToPayText")}</span>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-[#efe8d6] pt-10">
            <h2 className="text-[32px] font-extrabold leading-none tracking-tight text-brand-ink lg:text-4xl">
              {t("relatedTitle")}
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3.5 lg:grid-cols-3 lg:gap-6">
              {related.map((r) => (
                <PackageCard key={r.id} pkg={r} locale={loc} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
