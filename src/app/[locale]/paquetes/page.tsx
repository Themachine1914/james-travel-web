import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { PackageFilterGrid } from "@/components/packages/PackageFilterGrid";
import { getAllPackages, type Locale } from "@/lib/packages";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/paquetes">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "packagesPage" });
  return { title: t("title") };
}

export default async function PackagesPage({
  params,
}: PageProps<"/[locale]/paquetes">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("packagesPage");
  const packages = getAllPackages();

  return (
    <section className="pb-16 pt-10 lg:pb-24 lg:pt-14">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-[44px] font-extrabold leading-none tracking-tight text-brand-ink lg:text-[64px]">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-brand-ink-soft lg:text-xl">{t("subtitle")}</p>
        </div>

        <div className="mt-8">
          <PackageFilterGrid packages={packages} locale={locale as Locale} />
        </div>
      </Container>
    </section>
  );
}
