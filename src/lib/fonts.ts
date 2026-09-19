// Outfit gives headings a friendly geometric look close to the bold
// sans lettering on James Travel's flyers; Kaushan Script echoes the
// hand-drawn "tu guía al mundo" / "Profundo" style of the logo and
// flyers and is only used for one accent word per heading. DM Sans
// keeps body copy clean. If a licensed brand typeface arrives later,
// swap the imports below and keep the `variable` names so
// brand-theme.css and every component keep working unchanged.
import { DM_Sans, Kaushan_Script, Outfit } from "next/font/google";

export const headingFont = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const scriptFont = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const fontVariables = `${headingFont.variable} ${bodyFont.variable} ${scriptFont.variable}`;
