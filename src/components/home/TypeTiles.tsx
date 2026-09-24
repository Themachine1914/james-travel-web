import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import {
  formatPrice,
  getPackagesByType,
  getStartingPrice,
  type Locale,
  type PackageType,
} from "@/lib/packages";

export async function TypeTiles() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;

  const tiles: { type: PackageType; title: string; image: string; position: string }[] = [
    { type: "nacional", title: t("nationalTours"), image: "/images/tours/atractivos-samana.jpg", position: "50% 50%" },
    { type: "internacional", title: t("internationalTours"), image: "/images/tours/verano-europeo.jpg", position: "50% 42%" },
  ];

  return (
    <section className="bg-white pb-6 pt-14 lg:pb-10 lg:pt-24">
      <Container>
        <div className="flex flex-col gap-7 lg:gap-10">
          <div className="flex flex-col gap-1.5 lg:gap-2">
            <p className="hidden text-sm font-bold uppercase tracking-[0.16em] text-brand-gold-deep lg:block">
              {t("typeEyebrow")}
            </p>
            <h2 className="text-[38px] font-extrabold leading-[1.02] tracking-tight text-brand-ink lg:text-[56px] lg:leading-none">
              {t("typeTitle")}
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-7">
            {tiles.map((tile) => {
              const count = getPackagesByType(tile.type).length;
              const from = getStartingPrice(tile.type);
              return (
                <Link
                  key={tile.type}
                  href="/paquetes"
                  className="group relative flex h-[250px] items-end overflow-hidden rounded-3xl bg-brand-primary lg:h-[380px] lg:rounded-[32px]"
                >
                  <Image
                    src={tile.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 588px, 100vw"
                    style={{ objectPosition: tile.position }}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="relative flex w-full items-center justify-between gap-3 bg-brand-primary-dark px-5 py-[18px] lg:items-end lg:px-9 lg:py-8">
                    <div className="flex flex-col gap-1 lg:gap-1.5">
                      <span className="text-[26px] font-extrabold leading-none text-white lg:text-4xl">
                        {tile.title}
                      </span>
                      <span className="text-sm text-[#cfdcf0] lg:text-[17px]">
                        {t("toursCount", {
                          count,
                          price: from ? formatPrice(from.amount, from.currency, locale) : "",
                        })}
                      </span>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-accent text-brand-ink lg:h-14 lg:w-14">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
