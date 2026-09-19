"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { brand } from "@/lib/brand";
import { buildWhatsAppLink } from "@/data/business";

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/paquetes", label: t("packages") },
    { href: "/galeria", label: t("gallery") },
    { href: "/pagos", label: t("payments") },
    { href: "/contacto", label: t("contact") },
  ] as const;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-brand-primary-dark">
      <Container className="py-3 lg:py-4">
        <div className="flex h-16 items-center justify-between rounded-full bg-white pl-5 pr-2.5 shadow-lg shadow-black/10 lg:h-[76px] lg:pl-7 lg:pr-3.5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
          >
            <Image
              src={brand.logoHorizontal}
              alt={`${brand.name}, ${brand.tagline.es}`}
              width={brand.logoWidth}
              height={brand.logoHeight}
              priority
              className="h-9 w-auto lg:h-[50px]"
            />
          </Link>

          <nav className="hidden items-center gap-9 text-base font-semibold lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`transition-colors ${
                  isActive(link.href)
                    ? "text-brand-primary"
                    : "text-brand-ink hover:text-brand-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-3.5">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            <a
              href={buildWhatsAppLink(tc("genericWhatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-full bg-brand-accent px-[18px] text-[15px] font-bold text-brand-ink transition-colors hover:bg-brand-accent-light lg:h-12 lg:px-6 lg:text-base"
            >
              {t("book")}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={t("menu")}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef2f8] text-brand-primary lg:hidden"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 rounded-3xl bg-white p-3 shadow-lg lg:hidden">
            <nav className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-2xl px-4 py-3 text-base font-semibold ${
                    isActive(link.href)
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-brand-ink"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="px-4 pb-2 pt-3">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}
