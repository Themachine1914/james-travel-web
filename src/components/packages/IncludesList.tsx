export function IncludesList({
  title,
  items,
  variant = "include",
}: {
  title: string;
  items: string[];
  variant?: "include" | "exclude";
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-ink">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-brand-ink/80">
            {variant === "include" ? <CheckIcon /> : <XIcon />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mt-0.5 shrink-0 text-brand-primary"
    >
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mt-0.5 shrink-0 text-brand-ink/40"
    >
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}
