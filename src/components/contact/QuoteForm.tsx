"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { buildWhatsAppLink } from "@/data/business";
import type { Locale, TravelPackage } from "@/lib/packages";

const fieldClass =
  "w-full rounded-2xl border-[1.5px] border-[#d9e2f0] bg-white px-4 text-[16px] text-brand-ink transition-colors placeholder:text-brand-ink-soft/60 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20";
const inputClass = `${fieldClass} h-14`;
const labelClass = "mb-2 block text-[15px] font-semibold text-brand-ink";

export function QuoteForm({
  packages,
  locale,
}: {
  packages: TravelPackage[];
  locale: Locale;
}) {
  const t = useTranslations("contactPage");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [packageId, setPackageId] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const pkg = packages.find((p) => p.id === packageId);

    const lines = [
      t("waIntro", { name: name || "-" }),
      email && t("waEmail", { email }),
      phone && t("waPhone", { phone }),
      pkg && t("waPackage", { title: pkg.title[locale] }),
      message && t("waMessage", { message }),
    ].filter(Boolean) as string[];

    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-[28px] bg-white p-6 shadow-[0_1px_0_#efe8d6,0_30px_60px_-30px_rgba(20,49,90,0.4)] lg:rounded-[32px] lg:p-9"
    >
      <h2 className="text-[26px] font-bold leading-tight text-brand-ink lg:text-[30px]">
        {t("formTitle")}
      </h2>

      <div>
        <label className={labelClass} htmlFor="name">
          {t("formName")}
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="email">
            {t("formEmail")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            {t("formPhone")}
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="package">
          {t("formPackage")}
        </label>
        <div className="relative">
          <select
            id="package"
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
            className={`${inputClass} appearance-none pr-12`}
          >
            <option value="">{t("formPackagePlaceholder")}</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.title[locale]}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-primary"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          {t("formMessage")}
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("formMessagePlaceholder")}
          className={`${fieldClass} py-3.5 leading-relaxed`}
        />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-brand-accent px-7 text-base font-bold text-brand-ink transition-colors hover:bg-brand-accent-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary lg:h-[58px] lg:text-[17px]"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5z" />
          </svg>
          {t("formSubmit")}
        </button>
        <p className="text-[13px] leading-normal text-brand-ink-soft">{t("formNote")}</p>
      </div>
    </form>
  );
}
