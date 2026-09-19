import { buildWhatsAppLink } from "@/data/business";

type Variant = "solid" | "outline" | "navy";

const variants: Record<Variant, string> = {
  solid: "bg-brand-accent text-brand-ink hover:bg-brand-accent-light",
  outline: "border-2 border-white text-white hover:bg-white/10",
  navy: "bg-brand-primary text-white hover:bg-brand-primary-dark",
};

export function WhatsAppButton({
  message,
  children,
  variant = "solid",
  className = "",
}: {
  message: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base =
    "inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-7 text-base font-bold transition-colors";

  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      <WhatsAppIcon />
      {children}
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5z" />
    </svg>
  );
}
