"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PackageCard } from "@/components/packages/PackageCard";
import type { Locale, PackageType, TravelPackage } from "@/lib/packages";

type Filter = "todos" | PackageType;

export function PackageFilterGrid({
  packages,
  locale,
  columns = 3,
  surface = "white",
  totalCount,
}: {
  packages: TravelPackage[];
  locale: Locale;
  columns?: 3 | 4;
  surface?: "white" | "sand";
  /** When set, adds a final tile linking to the full catalog with this count. */
  totalCount?: number;
}) {
  const t = useTranslations("packagesPage");
  const th = useTranslations("home");
  const [filter, setFilter] = useState<Filter>("todos");

  const filtered = useMemo(() => {
    if (filter === "todos") return packages;
    return packages.filter((pkg) => pkg.type === filter);
  }, [filter, packages]);

  const tabs: { key: Filter; label: string }[] = [
    { key: "todos", label: t("filterAll") },
    { key: "nacional", label: t("filterNational") },
    { key: "internacional", label: t("filterInternational") },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2.5" role="group" aria-label={t("title")}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            aria-pressed={filter === tab.key}
            className={`h-11 rounded-full px-5 text-[15px] font-semibold transition-colors ${
              filter === tab.key
                ? "bg-brand-primary text-white"
                : "border-[1.5px] border-[#c5d3e8] bg-white text-brand-ink hover:border-brand-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-brand-ink-soft">{t("noResults")}</p>
      ) : (
        <div
          className={`mt-8 grid grid-cols-2 gap-3.5 lg:gap-6 ${
            columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {filtered.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} locale={locale} surface={surface} />
          ))}
          {totalCount !== undefined && filter === "todos" && (
            <Link
              href="/paquetes"
              className="flex min-h-[200px] flex-col justify-between gap-4 rounded-3xl bg-brand-accent p-5 text-brand-ink transition-colors hover:bg-brand-accent-light sm:p-7"
            >
              <span className="font-script text-2xl leading-tight sm:text-[34px]">{th("moreTile")}</span>
              <span className="flex flex-col gap-3.5">
                <span className="text-xl font-extrabold leading-tight sm:text-3xl">
                  {th("allToursTile", { count: totalCount })}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary-dark text-white sm:h-[52px] sm:w-[52px]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
