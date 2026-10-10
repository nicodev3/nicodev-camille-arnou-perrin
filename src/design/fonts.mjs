// @ts-check
/**
 * Polices du design client (Google Stitch — Accueil teinte vert olive MenteNova).
 * Plus Jakarta Sans = corps / nav / labels ; Newsreader = titres display (italique inclus).
 *
 * Réservé à `astro.config` : ne pas importer depuis les pages (tire `astro/config`).
 *
 * @type {import("astro").AstroUserConfig["fonts"]}
 */
import { fontProviders } from "astro/config";
import { siteFontCssVariables } from "./font-css-variables.mjs";

export const siteFonts = [
  {
    provider: fontProviders.google(),
    name: "Plus Jakarta Sans",
    cssVariable: siteFontCssVariables.jakarta,
    weights: [300, 400, 500, 600],
    styles: ["normal"],
    subsets: ["latin"],
    fallbacks: ["sans-serif"],
  },
  {
    provider: fontProviders.google(),
    name: "Newsreader",
    cssVariable: siteFontCssVariables.newsreader,
    weights: [300, 400, 500],
    styles: ["normal", "italic"],
    subsets: ["latin"],
    fallbacks: ["serif"],
  },
];
