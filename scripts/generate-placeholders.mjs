// One-off generator for placeholder destination images (Caribbean blue-gold theme).
// Run with: node scripts/generate-placeholders.mjs
// Replace the generated files in /public/images/** with real photography whenever it's ready —
// nothing in the app depends on these being SVGs specifically.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OCEAN = "#0B5C7A";
const OCEAN_LIGHT = "#1C93C2";
const GOLD = "#F4B400";
const GOLD_LIGHT = "#FFD166";
const INK = "#0B2436";

function svg({ label, sub, seed = 0, w = 1200, h = 800 }) {
  const angle = 135 + (seed % 3) * 15;
  const sunCx = w * (0.78 - (seed % 4) * 0.05);
  const sunCy = h * 0.28;
  const waveOffset = (seed % 5) * 12;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg${seed}" gradientTransform="rotate(${angle})">
      <stop offset="0%" stop-color="${OCEAN}"/>
      <stop offset="55%" stop-color="${OCEAN_LIGHT}"/>
      <stop offset="100%" stop-color="${GOLD}"/>
    </linearGradient>
    <radialGradient id="sun${seed}">
      <stop offset="0%" stop-color="${GOLD_LIGHT}"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0.85"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg${seed})"/>
  <circle cx="${sunCx}" cy="${sunCy}" r="${h * 0.16}" fill="url(#sun${seed})"/>
  <path d="M0 ${h * 0.72} Q ${w * 0.25} ${h * 0.68 + waveOffset} ${w * 0.5} ${h * 0.72} T ${w} ${h * 0.72} V ${h} H0 Z" fill="${OCEAN}" opacity="0.55"/>
  <path d="M0 ${h * 0.82} Q ${w * 0.25} ${h * 0.78 + waveOffset} ${w * 0.5} ${h * 0.82} T ${w} ${h * 0.82} V ${h} H0 Z" fill="${INK}" opacity="0.35"/>
  <rect x="0" y="${h - 118}" width="${w}" height="118" fill="${INK}" opacity="0.38"/>
  <text x="40" y="${h - 62}" font-family="Georgia, 'Times New Roman', serif" font-size="40" fill="#FFFFFF" font-weight="600">${label}</text>
  ${sub ? `<text x="40" y="${h - 26}" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#FFFFFF" opacity="0.85">${sub}</text>` : ""}
</svg>`;
}

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
  console.log("wrote", path);
}

const root = fileURLToPath(new URL("../public/", import.meta.url));

// Hero
write(root + "images/hero.svg", svg({ label: "James Travel", sub: "Santiago, República Dominicana", seed: 0, w: 1920, h: 1080 }));

const packages = [
  { slug: "tour-sur-profundo", label: "Tour Sur Profundo" },
  { slug: "san-juan-elias-pina-pedernales", label: "San Juan, Elías Piña y Pedernales" },
  { slug: "samana-bahia-el-limon", label: "Samaná & Cascada El Limón" },
  { slug: "punta-cana-resort", label: "Punta Cana Resort" },
  { slug: "santo-domingo-colonial-saona", label: "Santo Domingo Colonial + Saona" },
  { slug: "cancun-mexico", label: "Cancún, México" },
  { slug: "cartagena-colombia", label: "Cartagena de Indias" },
  { slug: "otono-europeo", label: "Otoño Europeo" },
  { slug: "dubai-emiratos", label: "Dubái, EAU" },
];

packages.forEach((p, i) => {
  for (let n = 1; n <= 3; n++) {
    write(
      `${root}images/packages/${p.slug}/${n}.svg`,
      svg({ label: p.label, sub: `Foto ${n}`, seed: i * 3 + n })
    );
  }
});

const generalGallery = [
  { file: "clientes-1", label: "Clientes James Travel", sub: "Viaje internacional" },
  { file: "clientes-2", label: "Clientes James Travel", sub: "Tour nacional" },
  { file: "clientes-3", label: "Clientes James Travel", sub: "Grupo en destino" },
  { file: "destinos-1", label: "Destinos", sub: "Playas de RD" },
  { file: "destinos-2", label: "Destinos", sub: "Ciudad colonial" },
  { file: "destinos-3", label: "Destinos", sub: "Naturaleza" },
];

generalGallery.forEach((g, i) => {
  write(root + `images/gallery/${g.file}.svg`, svg({ label: g.label, sub: g.sub, seed: 20 + i }));
});

// NOTE: brand/logo-horizontal.png and brand/icon.svg are no longer
// generated here — they were replaced with the real James Travel logo
// (background removed from the client's Logo.jpg) and a redrawn icon in
// the real brand colors. This script only (re)generates destination/
// gallery placeholder photos.

console.log("Done.");
