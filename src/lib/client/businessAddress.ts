import type { ClientConfig } from "./schema.ts";

type Business = ClientConfig["business"];

/** Ligne rue + complément (code, bâtiment…) pour affichage. */
export function businessStreetLines(b: Business): string[] {
  const line1 = b.addressLine1.trim();
  const line2 = b.addressLine2?.trim() ?? "";
  return [line1, line2].filter((s) => s.length > 0);
}

/** Adresse complète sur une ligne (géocodage, mentions légales). */
export function businessAddressText(b: Business): string {
  return `${businessStreetLines(b).join(", ")}, ${b.postalCode} ${b.city}`;
}

/**
 * Secteur affiché hors adresse postale (hero, pied de page, référencement) :
 * `areaLabel` quand le cabinet rayonne au-delà de la commune, sinon la ville.
 */
export function businessAreaLabel(b: Business): string {
  return b.areaLabel?.trim() || b.city;
}

/** Communes du secteur, pour `areaServed` (JSON-LD) : « Versailles, Le Chesnay » → 2 entrées. */
export function businessAreaLocalities(b: Business): string[] {
  return businessAreaLabel(b)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}
