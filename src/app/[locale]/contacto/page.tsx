import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { buildWhatsAppLink, business } from "@/data/business";
import { getAllPackages, type Locale } from "@/lib/packages";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contacto">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contacto">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("contactPage");
  const tc = await getTranslations("common");
  const loc = locale as Locale;
  const packages = getAllPackages();

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

        <div className="mt-9 grid gap-5 lg:mt-12 lg:grid-cols-5 lg:gap-7">
          {/* Calling is how most of their travelers actually book, so the
              phone numbers get the largest type on the page. */}
          <div className="flex flex-col gap-6 rounded-[28px] bg-brand-primary-dark p-6 lg:col-span-2 lg:rounded-[32px] lg:gap-7 lg:p-9">
            <div className="flex flex-col gap-3">
              <h2 className="text-[30px] font-bold leading-tight text-white lg:text-[34px]">
                {t("directTitle")}
              </h2>
              <p className="text-base leading-relaxed text-[#cfdcf0] lg:text-[17px]">
                {t("directText")}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              {business.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="font-heading text-[30px] font-extrabold leading-tight text-brand-accent hover:underline lg:text-[34px]"
                >
                  {phone}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2.5 border-t border-[#2e5a9b] pt-6">
              <ContactRow
                href={buildWhatsAppLink(tc("genericWhatsappMessage"))}
                external
                label={t("whatsappUs")}
                value={business.whatsappDisplay}
                icon={
                  <path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5z" />
                }
              />
              <ContactRow
                href={`mailto:${business.email}`}
                label={t("emailUs")}
                value={business.email}
                icon={
                  <>
                    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
                    <path d="M3.5 7.5l8.5 6 8.5-6" />
                  </>
                }
              />
              <ContactRow
                value={business.address[loc]}
                icon={
                  <>
                    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </>
                }
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <QuoteForm packages={packages} locale={loc} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  href,
  external,
  label,
  value,
  icon,
}: {
  href?: string;
  external?: boolean;
  label?: string;
  value: string;
  icon: React.ReactNode;
}) {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-white/10 text-brand-accent">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {icon}
        </svg>
      </span>
      <span className="min-w-0">
        {label && <span className="block text-[13px] text-[#9fb6d6]">{label}</span>}
        <span className="block text-[15px] font-semibold text-white [overflow-wrap:anywhere]">
          {value}
        </span>
      </span>
    </>
  );

  if (!href) {
    return <div className="flex items-center gap-3.5 py-1">{content}</div>;
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="-mx-2 flex items-center gap-3.5 rounded-2xl px-2 py-1 transition-colors hover:bg-white/5"
    >
      {content}
    </a>
  );
}
