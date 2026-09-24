import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { business } from "@/data/business";

export async function ContactBand() {
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  return (
    <section className="py-12 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5 overflow-hidden rounded-[32px] bg-brand-accent px-6 py-9 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:rounded-[40px] lg:px-[72px] lg:py-16">
          <div className="flex max-w-[560px] flex-col gap-4 lg:gap-5">
            <h2 className="text-[38px] font-extrabold leading-none tracking-tight text-brand-ink lg:text-[56px]">
              {t("ctaTitle")} <span className="font-script">{t("ctaScript")}</span>
            </h2>
            <p className="text-[17px] leading-relaxed text-[#3a3210] lg:text-[19px]">{t("ctaSubtitle")}</p>
            <div className="flex flex-col font-heading text-[26px] font-bold lg:gap-1 lg:text-3xl">
              {business.phones.map((phone) => (
                <a key={phone} href={`tel:${phone}`} className="hover:underline">
                  {phone}
                </a>
              ))}
            </div>
            <div className="mt-1 flex flex-col gap-3.5 sm:flex-row">
              <WhatsAppButton message={tc("genericWhatsappMessage")} variant="navy" className="h-14 text-[17px]">
                {t("ctaButton")}
              </WhatsAppButton>
              <Link
                href="/pagos"
                className="hidden h-14 items-center rounded-full border-2 border-brand-primary-dark px-7 text-[17px] font-bold text-brand-primary-dark transition-colors hover:bg-brand-primary-dark/10 lg:inline-flex"
              >
                {t("ctaPayments")}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden h-[360px] w-[400px] shrink-0 lg:block">
            <div className="absolute left-[60px] top-0 h-[280px] w-[280px] overflow-hidden rounded-full border-[10px] border-white">
              <Image src="/images/tours/montana-redonda.jpg" alt="" fill sizes="280px" className="object-cover object-[50%_42%]" />
            </div>
            <div className="absolute left-0 top-[210px] h-[170px] w-[170px] overflow-hidden rounded-full border-8 border-white">
              <Image src="/images/tours/tour-sur-profundo-2.jpg" alt="" fill sizes="170px" className="object-cover" />
            </div>
            <div className="absolute right-0 top-[230px] h-[150px] w-[150px] overflow-hidden rounded-full border-8 border-white">
              <Image src="/images/tours/egipto-semana-santa.jpg" alt="" fill sizes="150px" className="object-cover" />
            </div>
          </div>

          <div className="flex justify-center pt-1.5 lg:hidden">
            {["tour-sur-profundo-2", "montana-redonda", "egipto-semana-santa"].map((img, i) => (
              <div
                key={img}
                className={`relative h-[92px] w-[92px] overflow-hidden rounded-full border-[6px] border-white ${i > 0 ? "-ml-4" : ""}`}
              >
                <Image src={`/images/tours/${img}.jpg`} alt="" fill sizes="92px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
