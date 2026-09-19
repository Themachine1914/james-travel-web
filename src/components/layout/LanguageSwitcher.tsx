"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center rounded-full bg-[#eef2f8] p-1 text-sm">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={locale === loc}
          className={`rounded-full px-3.5 py-1.5 font-bold uppercase transition-colors ${
            locale === loc
              ? "bg-brand-primary text-white"
              : "text-brand-primary hover:text-brand-primary-dark"
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
