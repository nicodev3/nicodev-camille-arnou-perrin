// @ts-check
/**
 * Polices du design client (Google Stitch — Accueil style MenteNova).
 * Plus Jakarta Sans = corps / nav / labels ; Newsreader = titres display (italique inclus).
 *
 * @type {import("astro").AstroUserConfig["fonts"]}
 */
import { fontProviders } from "astro/config";

export const siteFonts = [
  {
    provider: fontProviders.google(),
    name: "Plus Jakarta Sans",
    cssVariable: "--font-jakarta",
    weights: [300, 400, 500, 600],
    styles: ["normal"],
    subsets: ["latin"],
    fallbacks: ["sans-serif"],
  },
  {
    provider: fontProviders.google(),
    name: "Newsreader",
    cssVariable: "--font-newsreader",
    weights: [300, 400, 500],
    styles: ["normal", "italic"],
    subsets: ["latin"],
    fallbacks: ["serif"],
  },
];
