// Central place components read brand assets from. logo-horizontal.png
// is the real James Travel logo (background removed, cropped from the
// client-provided Logo.jpg); icon.svg is a redrawn version of the pin
// + sun + wave mark seen on their tour flyers, in the real brand colors.
// If the client sends different files, update the paths/dimensions here
// only — nothing else needs to change.
export const brand = {
  name: "James Travel",
  tagline: {
    es: "tu guía al mundo",
    en: "your guide to the world",
  },
  logoHorizontal: "/brand/logo-horizontal.png",
  icon: "/brand/icon.svg",
  logoWidth: 180,
  logoHeight: 50, // logo-horizontal.png is 798x220 (~3.63:1) — keep this ratio if resizing
} as const;
