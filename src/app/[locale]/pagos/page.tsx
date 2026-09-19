import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { PaymentCard } from "@/components/payments/PaymentCard";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { business } from "@/data/business";
import type { Locale } from "@/lib/packages";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/pagos">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "paymentsPage" });
  return { title: t("title") };
}

export default async function PaymentsPage({
  params,
}: PageProps<"/[locale]/pagos">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("paymentsPage");
  const loc = locale as Locale;
  const { zelle, bankTransferRD } = business.payments;

  return (
    <>
      <section className="pb-14 pt-10 lg:pb-20 lg:pt-14">
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

          <div className="mt-9 grid gap-5 lg:mt-12 lg:grid-cols-2 lg:items-start lg:gap-7">
            <PaymentCard
              title={t("zelleTitle")}
              icon={<ZelleIcon />}
              rows={[
                { label: t("zelleRecipient"), value: zelle.recipient },
                { label: t("zelleContact"), value: zelle.emailOrPhone, copyable: true },
              ]}
            />
            <PaymentCard
              title={t("bankTitle")}
              icon={<BankIcon />}
              rows={[
                { label: t("bankName"), value: bankTransferRD.bankName },
                { label: t("accountName"), value: bankTransferRD.accountName, copyable: true },
                { label: t("accountType"), value: bankTransferRD.accountType[loc] },
                { label: t("accountNumber"), value: bankTransferRD.accountNumber, copyable: true },
                { label: t("rnc"), value: bankTransferRD.rnc, copyable: true },
              ]}
            />
          </div>
        </Container>
      </section>

      <section className="bg-brand-primary-dark py-14 lg:py-20">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="flex max-w-[620px] flex-col gap-4">
              <h2 className="text-[38px] font-extrabold leading-none tracking-tight text-white lg:text-[52px]">
                {t("receiptTop")} <span className="font-script text-brand-accent">{t("receiptScript")}</span>
              </h2>
              <p className="text-[17px] leading-relaxed text-[#cfdcf0] lg:text-[19px]">
                {t("receiptText")}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-4">
              <WhatsAppButton
                message={t("receiptWhatsappMessage")}
                className="lg:h-[58px] lg:text-[17px]"
              >
                {t("receiptButton")}
              </WhatsAppButton>
              <p className="text-[15px] text-[#cfdcf0]">
                {t("callInstead")}{" "}
                {business.phones.map((phone, i) => (
                  <span key={phone}>
                    {i > 0 && " · "}
                    <a href={`tel:${phone}`} className="font-heading font-bold text-white hover:underline">
                      {phone}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ZelleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v2.5M12 18.5V21M7.5 6h9L7.5 18h9" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10 12 4l9 6M5 10v9M19 10v9M9.5 10v9M14.5 10v9M3 19h18" />
    </svg>
  );
}
