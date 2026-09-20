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
  const { domestic, international } = business.payments;

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

          <h2 className="mt-12 text-[30px] font-extrabold leading-tight tracking-tight text-brand-ink lg:mt-16 lg:text-[38px]">
            {t("domesticTitle")}
          </h2>

          <div className="mt-6 flex flex-col gap-5 rounded-[24px] border border-[#dfe7f2] bg-[#f3f7fc] px-6 py-5 sm:flex-row sm:items-center sm:gap-10 lg:px-8">
            <p className="max-w-[230px] text-[15px] leading-snug text-brand-ink-soft">
              {t("domesticNote")}
            </p>
            <dl className="flex flex-wrap gap-x-12 gap-y-4">
              <div>
                <dt className="text-[13px] text-brand-ink-soft">{t("holder")}</dt>
                <dd className="font-heading text-[19px] font-bold text-brand-ink lg:text-[22px]">
                  {domestic.holder}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-brand-ink-soft">{t("idNumber")}</dt>
                <dd className="font-heading text-[19px] font-bold text-brand-ink lg:text-[22px]">
                  {domestic.idNumber}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-5 grid gap-5 lg:mt-6 lg:grid-cols-2 lg:items-start lg:gap-7">
            {domestic.banks.map((bank) => (
              <PaymentCard
                key={bank.name}
                title={bank.name}
                rows={bank.accounts.map((account) => ({
                  label: account.type[loc],
                  value: account.number,
                  currency: "currency" in account ? account.currency : undefined,
                  copyable: true,
                }))}
              />
            ))}
          </div>

          <h2 className="mt-14 text-[30px] font-extrabold leading-tight tracking-tight text-brand-ink lg:mt-20 lg:text-[38px]">
            {t("internationalTitle")}
          </h2>
          <p className="mt-3 max-w-[560px] text-[17px] leading-relaxed text-brand-ink-soft">
            {t("internationalNote")}
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-7">
            <PaymentCard
              title={t("zelleTitle")}
              icon={<ZelleIcon />}
              rows={[
                { label: t("beneficiary"), value: international.beneficiary },
                { label: t("zelleContact"), value: international.zelle, copyable: true },
              ]}
            />
            <PaymentCard
              title={t("wireTitle")}
              icon={<BankIcon />}
              rows={[
                { label: t("bankName"), value: international.bank },
                { label: t("beneficiary"), value: international.beneficiary },
                { label: t("beneficiaryAddress"), value: international.address, copyable: true },
                { label: t("accountNumber"), value: international.accountNumber, copyable: true },
                { label: t("achNumber"), value: international.ach, copyable: true },
                { label: t("wireNumber"), value: international.wire, copyable: true },
                { label: t("swiftCode"), value: international.swift, copyable: true },
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
