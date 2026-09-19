import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatPrice, type Locale, type TravelPackage } from "@/lib/packages";

export function PackageCard({
  pkg,
  locale,
  surface = "white",
}: {
  pkg: TravelPackage;
  locale: Locale;
  surface?: "white" | "sand";
}) {
  const t = useTranslations("common");
  const kind = pkg.type === "internacional" ? t("international") : t("national");

  return (
    <Link
      href={`/paquetes/${pkg.id}`}
      className={`group flex flex-col overflow-hidden rounded-3xl transition-shadow hover:shadow-xl hover:shadow-brand-primary-dark/10 ${
        surface === "sand" ? "bg-brand-surface" : "border border-[#efe8d6] bg-white"
      }`}
    >
      <div className="relative h-40 bg-brand-primary sm:h-[210px]">
        <Image
          src={pkg.cover}
          alt={pkg.title[locale]}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          style={{ objectPosition: pkg.coverPosition ?? "50% 50%" }}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 pb-5 pt-4 sm:px-[22px] sm:pb-6 sm:pt-5">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-gold-deep">
          {kind}
        </span>
        <h3 className="flex-1 text-xl font-bold leading-tight text-brand-ink sm:text-[23px]">
          {pkg.title[locale]}
        </h3>
        <span className="text-sm text-brand-ink-soft">{pkg.dates[locale]}</span>
        <span className="font-heading text-2xl font-extrabold leading-tight text-brand-primary sm:text-[26px]">
          {formatPrice(pkg.price.adult, pkg.price.currency, locale)}
        </span>
      </div>
    </Link>
  );
}
