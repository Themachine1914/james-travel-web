import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { formatPrice, getUpcomingPackages, type Locale } from "@/lib/packages";

export async function Hero() {
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const locale = (await getLocale()) as Locale;
  const next = getUpcomingPackages()[0];

  return (
    <section className="overflow-x-clip bg-brand-primary-dark">
      <Container>
        <div className="flex flex-col gap-10 pb-6 pt-8 lg:h-[660px] lg:flex-row lg:items-center lg:gap-5 lg:py-0">
          <div className="flex flex-col gap-5 lg:w-[590px] lg:shrink-0 lg:gap-[26px]">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-accent sm:text-sm sm:tracking-[0.16em]">
              <span className="h-[3px] w-7 rounded-sm bg-brand-accent sm:w-9" />
              {t("heroEyebrow")}
            </p>
            <h1 className="flex flex-col leading-[0.9]">
              <span className="text-[76px] font-extrabold tracking-tight text-white lg:text-[108px]">
                {t("heroTitleTop")}
              </span>
              <span className="font-script mt-1 text-[80px] text-brand-accent lg:mt-1.5 lg:text-[112px]">
                {t("heroTitleScript")}
              </span>
            </h1>
            <p className="max-w-[500px] text-lg leading-relaxed text-[#cfdcf0] lg:text-xl">
              {t("heroSubtitle")}
            </p>
            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:gap-3.5">
              <Link
                href="/paquetes"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-brand-accent px-7 text-base font-bold text-brand-ink transition-colors hover:bg-brand-accent-light lg:h-[58px] lg:text-[17px]"
              >
                {t("heroCtaPrimary")}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <WhatsAppButton
                message={tc("genericWhatsappMessage")}
                variant="outline"
                className="lg:h-[58px] lg:text-[17px]"
              >
                {t("heroCtaSecondary")}
              </WhatsAppButton>
            </div>
          </div>

          {/* Photo composition: arch, circles and a floating departure card */}
          <div className="relative mx-1 h-[470px] lg:mx-0 lg:h-[600px] lg:flex-1">
            <div
              aria-hidden
              className="absolute right-[-14px] top-0 h-[250px] w-[250px] rounded-full border-[12px] border-brand-accent lg:right-[-30px] lg:top-1.5 lg:h-[430px] lg:w-[430px] lg:border-[16px]"
            />
            <div className="absolute left-10 top-0 h-[340px] w-[260px] overflow-hidden rounded-t-[130px] rounded-b-3xl bg-brand-primary lg:left-[70px] lg:h-[580px] lg:w-[440px] lg:rounded-t-[220px] lg:rounded-b-[32px]">
              <Image
                src="/images/hero-sanjuan.jpg"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 440px, 260px"
                className="object-cover object-[38%_50%]"
              />
            </div>
            <div className="absolute -left-1 top-[230px] h-32 w-32 overflow-hidden rounded-full border-[6px] border-white lg:-left-1.5 lg:top-[372px] lg:h-[200px] lg:w-[200px] lg:border-8">
              <Image src="/images/tours/atractivos-samana.jpg" alt="" fill sizes="200px" className="object-cover" />
            </div>
            <div className="absolute right-0 top-[206px] h-[104px] w-[104px] overflow-hidden rounded-full border-[6px] border-white lg:-right-1.5 lg:top-[300px] lg:h-40 lg:w-40 lg:border-8">
              <Image src="/images/tours/ballenas-jorobadas.jpg" alt="" fill sizes="160px" className="object-cover" />
            </div>

            {next && (
              <Link
                href={`/paquetes/${next.id}`}
                className="absolute inset-x-0 bottom-0 flex flex-col gap-1 rounded-[22px] bg-white px-5 py-[18px] shadow-2xl shadow-black/35 lg:inset-x-auto lg:-right-1.5 lg:w-[290px] lg:gap-1.5 lg:rounded-3xl lg:p-5"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-gold-deep lg:text-xs">
                  {t("nextDeparture")}
                </span>
                <span className="font-heading text-2xl font-bold leading-tight text-brand-ink lg:text-[26px]">
                  {next.title[locale]}
                </span>
                <span className="text-sm text-brand-ink-soft lg:text-[15px]">{next.dates[locale]}</span>
                <span className="font-heading text-[22px] font-bold text-brand-primary">
                  {formatPrice(next.price.adult, next.price.currency, locale)}{" "}
                  <span className="font-body text-[13px] font-medium text-brand-ink-soft">
                    {t("heroCardNote")}
                  </span>
                </span>
              </Link>
            )}
          </div>
        </div>
      </Container>

      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden
        className="-mb-px block h-12 w-full lg:h-[90px]"
      >
        <path d="M0 50 C 240 110, 480 0, 760 40 S 1240 100, 1440 30 L1440 90 L0 90 Z" fill="var(--brand-sand)" />
      </svg>
    </section>
  );
}
