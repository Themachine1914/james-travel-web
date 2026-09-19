import { getTranslations } from "next-intl/server";

export async function DestinationsTicker() {
  const t = await getTranslations("home");
  const items = t.raw("tickerItems") as string[];

  return (
    <ul className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-[18px] gap-y-2 px-4 pb-6 pt-2 font-heading text-base font-semibold text-brand-primary lg:gap-x-7 lg:px-8 lg:pb-4 lg:pt-0 lg:text-lg">
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-[18px] lg:gap-7">
          {item}
          {i < items.length - 1 && (
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-accent lg:h-[7px] lg:w-[7px]" />
          )}
        </li>
      ))}
    </ul>
  );
}
