"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { GalleryItem } from "@/data/gallery";
import type { Locale } from "@/lib/packages";

const FLYER_SIZES = "(min-width: 640px) 620px, 92vw";

// Flyers are shown at their own proportions inside a white mat, the way
// the printed originals look, and open full size because the price,
// dates and itinerary are part of the artwork.
export function GalleryGrid({ items, locale }: { items: GalleryItem[]; locale: Locale }) {
  const t = useTranslations("galleryPage");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    lastTriggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? current : (current + delta + items.length) % items.length
      ),
    [items.length]
  );

  useEffect(() => {
    if (openIndex === null) return;

    closeButtonRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "Tab") keepFocusInside(event, dialogRef.current);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : items[openIndex];
  const activeRatio = active?.width && active.height ? active.width / active.height : 0.8;

  const neighbours =
    openIndex === null
      ? []
      : [...new Set([
          (openIndex - 1 + items.length) % items.length,
          (openIndex + 1) % items.length,
        ])]
          .filter((index) => index !== openIndex)
          .map((index) => items[index]);

  return (
    <>
      <div className="columns-2 gap-3.5 sm:columns-3 lg:columns-4 lg:gap-5">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={(event) => {
              lastTriggerRef.current = event.currentTarget;
              setOpenIndex(i);
            }}
            aria-label={`${item.caption[locale]} — ${t("openFlyer")}`}
            className="group mb-3.5 block w-full break-inside-avoid rounded-[20px] bg-white p-2 text-left shadow-[0_1px_0_#efe8d6,0_18px_40px_-28px_rgba(20,49,90,0.45)] transition-shadow hover:shadow-[0_1px_0_#efe8d6,0_26px_50px_-24px_rgba(20,49,90,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary lg:mb-5 lg:rounded-[24px] lg:p-2.5"
          >
            <span className="relative block overflow-hidden rounded-[13px] bg-[#eef2f8] lg:rounded-[16px]">
              <Image
                src={item.src}
                alt={item.caption[locale]}
                width={item.width ?? 1024}
                height={item.height ?? 1280}
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 46vw"
                loading={i < 8 ? "eager" : "lazy"}
                className="h-auto w-full"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-brand-primary-dark via-brand-primary-dark/85 to-transparent px-3 pb-2.5 pt-8 text-[13px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:text-sm">
                <ExpandIcon />
                {t("openFlyer")}
              </span>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.caption[locale]}
          onClick={close}
          className="fixed inset-0 z-50 flex flex-col items-center gap-4 overflow-y-auto bg-brand-primary-dark/[0.97] px-4 py-5 lg:gap-5 lg:py-8"
        >
          <div className="flex w-full max-w-[620px] shrink-0 items-start justify-between gap-4">
            <p className="font-heading pt-1 text-xl font-bold leading-tight text-white lg:text-2xl">
              {active.caption[locale]}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div
            onClick={(event) => event.stopPropagation()}
            className="flex w-full max-w-[620px] flex-1 items-center justify-center"
          >
            {/* The mat is sized from the flyer's own ratio, capped by the
                screen height, so a portrait poster neither floats inside a
                tall white box nor runs off the bottom of a phone. */}
            <span
              className="inline-block rounded-[20px] bg-white p-2 lg:p-2.5"
              style={{ width: `min(100%, calc(62vh * ${activeRatio}))` }}
            >
              <Image
                src={active.src}
                alt={active.caption[locale]}
                width={active.width ?? 1024}
                height={active.height ?? 1280}
                sizes={FLYER_SIZES}
                className="h-auto w-full rounded-[13px]"
              />
            </span>
          </div>

          {/* Same `sizes` as the open flyer, so the browser picks the same
              file and stepping to a neighbour is instant. */}
          <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
            {neighbours.map((item) => (
              <Image
                key={item.src}
                src={item.src}
                alt=""
                width={item.width ?? 1024}
                height={item.height ?? 1280}
                sizes={FLYER_SIZES}
              />
            ))}
          </div>

          <div
            onClick={(event) => event.stopPropagation()}
            className="flex w-full max-w-[620px] shrink-0 flex-wrap items-center gap-3"
          >
            {items.length > 1 && (
              <div className="flex gap-2">
                <FlyerNavButton label={t("prevFlyer")} onClick={() => step(-1)} direction="prev" />
                <FlyerNavButton label={t("nextFlyer")} onClick={() => step(1)} direction="next" />
              </div>
            )}
            {active.packageId && (
              <Link
                href={`/paquetes/${active.packageId}`}
                className="ml-auto inline-flex h-12 items-center gap-2 rounded-full bg-brand-accent px-6 text-[15px] font-bold text-brand-ink transition-colors hover:bg-brand-accent-light lg:text-base"
              >
                {t("viewPackage")}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/** Tab cycles through the open flyer's own controls, never back to the wall behind it. */
function keepFocusInside(event: KeyboardEvent, dialog: HTMLElement | null) {
  const focusable = dialog?.querySelectorAll<HTMLElement>("a[href], button");
  if (!focusable?.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const current = document.activeElement;

  if (current instanceof HTMLElement && !dialog?.contains(current)) {
    event.preventDefault();
    first.focus();
  } else if (event.shiftKey && current === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && current === last) {
    event.preventDefault();
    first.focus();
  }
}

function FlyerNavButton({
  label,
  onClick,
  direction,
}: {
  label: string;
  onClick: () => void;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/25 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === "prev" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

function ExpandIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" />
    </svg>
  );
}
