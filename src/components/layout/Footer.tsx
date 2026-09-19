import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { brand } from "@/lib/brand";
import { business } from "@/data/business";
import type { Locale } from "@/lib/packages";

const heading = "font-heading text-lg font-bold text-brand-ink";
const link = "hover:text-brand-primary";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();
  const socials = [
    { label: "Instagram", href: business.social.instagram },
    { label: "Facebook", href: business.social.facebook },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-[#efe8d6] bg-white">
      <Container className="flex flex-col gap-10 pb-8 pt-10 lg:pt-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-12">
          <div className="flex max-w-[340px] flex-col gap-4">
            <Image
              src={brand.logoHorizontal}
              alt={brand.name}
              width={brand.logoWidth}
              height={brand.logoHeight}
              className="h-14 w-auto self-start lg:h-16"
            />
            <p className="text-base leading-relaxed text-brand-ink-soft">{t("tagline")}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-base text-brand-ink-soft sm:grid-cols-3 lg:gap-x-24">
            <div className="flex flex-col gap-3">
              <h3 className={heading}>{t("quickLinks")}</h3>
              <Link href="/paquetes" className={link}>{nav("packages")}</Link>
              <Link href="/galeria" className={link}>{nav("gallery")}</Link>
              <Link href="/pagos" className={link}>{nav("payments")}</Link>
              <Link href="/contacto" className={link}>{nav("contact")}</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className={heading}>{t("contactTitle")}</h3>
              {business.phones.map((phone) => (
                <a key={phone} href={`tel:${phone}`} className={link}>{phone}</a>
              ))}
              <a href={`mailto:${business.email}`} className={`${link} break-all`}>{business.email}</a>
              <span>{business.address[locale]}</span>
            </div>
            {socials.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className={heading}>{t("followUs")}</h3>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="border-t border-[#efe8d6] pt-5 text-sm text-brand-ink-soft">
          © {year} {brand.name}. {t("rights")}
        </p>
      </Container>
    </footer>
  );
}
