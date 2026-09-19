import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import {
  formatPrice,
  getDepartureParts,
  getUpcomingPackages,
  type Locale,
} from "@/lib/packages";

export async function UpcomingDepartures() {
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const locale = (await getLocale()) as Locale;
  const upcoming = getUpcomingPackages();

  if (upcoming.length === 0) return null;

  return (
    <section className="pb-16 pt-8 lg:pb-24 lg:pt-14">
      <Container>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-1.5 lg:gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-deep lg:text-sm">
              {t("departuresEyebrow")}
            </p>
            <h2 className="text-[40px] font-extrabold leading-none tracking-tight text-brand-ink lg:text-[56px]">
              {t("departuresTitle")}{" "}
              <span className="font-script text-brand-primary">{t("departuresScript")}</span>
            </h2>
          </div>
          <Link
            href="/paquetes"
            className="hidden items-center gap-2 text-base font-bold text-brand-primary hover:text-brand-primary-dark lg:flex"
          >
            {t("viewAllPackages")}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="mt-7 grid gap-5 lg:mt-10 lg:grid-cols-3 lg:gap-7">
          {upcoming.map((pkg) => {
            const { day, month } = getDepartureParts(pkg.departsOn!, locale);
            const kind = pkg.type === "internacional" ? tc("international") : tc("national");
            return (
              <Link
                key={pkg.id}
                href={`/paquetes/${pkg.id}`}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_1px_0_#efe8d6,0_24px_48px_-28px_rgba(20,49,90,0.35)] lg:rounded-[28px]"
              >
                <div className="relative h-[210px] bg-brand-primary lg:h-[290px]">
                  <Image
                    src={pkg.cover}
                    alt={pkg.title[locale]}
                    fill
                    sizes="(min-width: 1024px) 384px, 100vw"
                    style={{ objectPosition: pkg.coverPosition ?? "50% 50%" }}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3.5 top-3.5 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-brand-accent leading-none text-brand-ink lg:left-[18px] lg:top-[18px] lg:h-[76px] lg:w-[76px]">
                    <span className="font-heading text-[22px] font-extrabold lg:text-[26px]">{day}</span>
                    <span className="mt-0.5 text-xs font-bold uppercase tracking-[0.08em] lg:text-[13px]">{month}</span>
                  </div>
                  <span className="absolute right-3.5 top-3.5 flex h-8 items-center rounded-full bg-brand-primary-dark/90 px-3 text-xs font-bold uppercase tracking-[0.06em] text-white lg:right-[18px] lg:top-[18px] lg:h-[34px] lg:px-3.5 lg:text-[13px]">
                    {kind}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 px-[22px] pb-6 pt-[22px] lg:gap-3 lg:px-7 lg:pb-7 lg:pt-[26px]">
                  <h3 className="text-[26px] font-bold leading-tight text-brand-ink lg:text-[28px]">
                    {pkg.title[locale]}
                  </h3>
                  <p className="text-[15px] text-brand-ink-soft">
                    {pkg.dates[locale]} · {pkg.duration[locale]}
                  </p>
                  <p className="flex-1 text-[15px] leading-normal text-brand-ink-soft lg:text-base">
                    {pkg.summary[locale]}
                  </p>
                  <div className="mt-1 flex items-end justify-between gap-3 border-t border-[#efe8d6] pt-4 lg:pt-[18px]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] text-brand-ink-soft">
                        {tc("adult")}
                        {pkg.price.child !== null &&
                          ` · ${tc("child")} ${formatPrice(pkg.price.child, pkg.price.currency, locale)}`}
                      </span>
                      <span className="font-heading text-[30px] font-extrabold leading-none text-brand-primary lg:text-[34px]">
                        {formatPrice(pkg.price.adult, pkg.price.currency, locale)}
                      </span>
                    </div>
                    <span className="flex h-[46px] items-center rounded-full bg-brand-primary px-5 text-[15px] font-bold text-white transition-colors group-hover:bg-brand-primary-dark lg:h-12">
                      {tc("reserve")}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
