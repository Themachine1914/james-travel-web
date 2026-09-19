"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export interface PaymentRow {
  label: string;
  value: string;
  /** "RD$" / "US$" — the one thing you must not get wrong when depositing. */
  currency?: string;
  /** Account numbers and emails are copied, not retyped. */
  copyable?: boolean;
}

export function PaymentCard({
  title,
  icon,
  rows,
}: {
  title: string;
  icon?: ReactNode;
  rows: PaymentRow[];
}) {
  const t = useTranslations("paymentsPage");
  // Keyed by value: a bank can hold two accounts of the same type, so the
  // label alone does not identify a row.
  const [copied, setCopied] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const values = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => () => clearTimeout(timeout.current), []);

  async function copy(row: PaymentRow) {
    try {
      await navigator.clipboard.writeText(row.value);
    } catch {
      selectValue(values.current[row.value]); // denied: leave it selected to copy by hand
      return;
    }
    setCopied(row.value);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(null), 2400);
  }

  return (
    <div className="flex flex-col gap-5 rounded-[28px] bg-white p-6 shadow-[0_1px_0_#efe8d6,0_30px_60px_-30px_rgba(20,49,90,0.4)] lg:rounded-[32px] lg:gap-6 lg:p-9">
      <div className="flex items-center gap-3.5">
        {icon && (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#eef2f8] text-brand-primary">
            {icon}
          </span>
        )}
        <h3 className="text-[24px] font-bold leading-tight text-brand-ink lg:text-[28px]">{title}</h3>
      </div>

      <dl className="border-t border-[#efe8d6]">
        {rows.map((row) => (
          <div
            key={row.value}
            className="flex items-center justify-between gap-4 border-b border-[#efe8d6] py-3.5"
          >
            <div className="min-w-0">
              <dt className="flex flex-wrap items-center gap-2 text-[13px] text-brand-ink-soft">
                {row.label}
                {row.currency && (
                  <span className="font-heading rounded-full bg-[#eef2f8] px-2 py-0.5 text-[11px] font-bold tracking-wide text-brand-primary">
                    {row.currency}
                  </span>
                )}
              </dt>
              <dd
                ref={(node) => {
                  values.current[row.value] = node;
                }}
                className="font-heading text-[17px] font-bold text-brand-ink [overflow-wrap:anywhere] lg:text-lg"
              >
                {row.value}
              </dd>
            </div>
            {row.copyable && (
              <button
                type="button"
                onClick={() => copy(row)}
                aria-label={t("copyLabel", {
                  label: row.currency ? `${row.label} ${row.currency}` : row.label,
                })}
                className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-[13px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                  copied === row.value
                    ? "bg-brand-accent text-brand-ink"
                    : "bg-[#eef2f8] text-brand-primary hover:bg-[#e2eaf6]"
                }`}
              >
                {copied === row.value ? <CheckIcon /> : <CopyIcon />}
                {copied === row.value ? t("copied") : t("copy")}
              </button>
            )}
          </div>
        ))}
      </dl>

      <p aria-live="polite" className="sr-only">
        {copied ? t("copied") : ""}
      </p>
    </div>
  );
}

function selectValue(node: HTMLElement | null) {
  const selection = window.getSelection();
  if (!node || !selection) return;

  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 5.5A2.5 2.5 0 0 0 12.5 4H6.5A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 5.5 15" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
