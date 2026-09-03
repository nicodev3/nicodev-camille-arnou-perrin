// @ts-check
/**
 * Polices du design client (Google Stitch — Minimalist Monochrome).
 * Manrope = corps / labels ; Newsreader = titres display.
 *
 * @type {import("astro").AstroUserConfig["fonts"]}
 */
import { fontProviders } from "astro/config";

export const siteFonts = [
  {
    provider: fontProviders.google(),
    name: "Manrope",
    cssVariable: "--font-manrope",
    weights: [400, 500, 600],
    subsets: ["latin"],
    fallbacks: ["sans-serif"],
  },
  {
    provider: fontProviders.google(),
    name: "Newsreader",
    cssVariable: "--font-newsreader",
    weights: [400, 500],
    subsets: ["latin"],
    fallbacks: ["serif"],
  },
];
