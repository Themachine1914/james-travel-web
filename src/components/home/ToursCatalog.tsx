import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PackageFilterGrid } from "@/components/packages/PackageFilterGrid";
import { getAllPackages, type Locale } from "@/lib/packages";

// Packages with a clean photo that are not already shown as an upcoming
// departure, in the order they appear on the home page.
const HOME_TOUR_IDS = [
  "atractivos-samana",
  "ballenas-jorobadas",
  "montana-redonda",
  "verano-europeo",
  "egipto-semana-santa",
  "maravillas-marruecos",
  "europa-del-este",
];

export async function ToursCatalog() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const all = getAllPackages();
  const selected = HOME_TOUR_IDS.map((id) => all.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <section className="bg-white pb-16 pt-10 lg:pb-[104px] lg:pt-14">
      <Container>
        <h2 className="mb-6 text-[34px] font-extrabold leading-none tracking-tight text-brand-ink lg:mb-8 lg:text-[44px]">
          {t("catalogTitle")}
        </h2>
        <PackageFilterGrid
          packages={selected}
          locale={locale}
          columns={4}
          surface="sand"
          totalCount={all.length}
        />
      </Container>
    </section>
  );
}
