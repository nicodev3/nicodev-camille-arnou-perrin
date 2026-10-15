import type { ClientConfig } from "./schema.ts";
import { AUDIENCE_LABEL_SHORT, type AudienceId } from "./audienceDisplay.ts";
import { formatConsultationModesPhrase } from "./consultationModesDisplay.ts";

/**
 * Ordre d’énonciation des publics dans le sous-titre hero : le public principal (adultes) d’abord,
 * puis les publics plus spécifiques. Distinct de `AUDIENCE_ORDER` (listes par tranche d’âge).
 */
const HERO_AUDIENCE_ORDER: readonly AudienceId[] = [
  "adultes",
  "adolescents",
  "enfants",
  "couples",
  "familles",
  "autre",
];

export function formatFrenchList(items: string[]): string {
  const filtered = items.map((s) => s.trim()).filter(Boolean);
  if (filtered.length === 0) return "";
  if (filtered.length === 1) return filtered[0]!;
  if (filtered.length === 2) return `${filtered[0]} et ${filtered[1]}`;
  return `${filtered.slice(0, -1).join(", ")} et ${filtered[filtered.length - 1]}`;
}

/**
 * Partie du sous-titre hero après le préfixe métier (« Consultations de psychologie pour », etc.),
 * incluant le point final (publics + modes de consultation).
 */
export function heroConsultationTaglineAfterPour(practice: ClientConfig["practice"]): string {
  const audienceSet = new Set(practice.audience);
  const detail = practice.audienceOther.trim();
  const segments: string[] = [];
  for (const id of HERO_AUDIENCE_ORDER) {
    if (!audienceSet.has(id)) continue;
    if (id === "autre") {
      if (detail) segments.push(detail);
    } else {
      segments.push(AUDIENCE_LABEL_SHORT[id]);
    }
  }

  // La précision libre (ex. « à partir de 16 ans ») qualifie le dernier public cité.
  if (!audienceSet.has("autre") && detail && segments.length > 0) {
    segments[segments.length - 1] = `${segments[segments.length - 1]} ${detail}`;
  }

  let audiencePart = formatFrenchList(segments);
  if (!audiencePart) {
    audiencePart = "adultes";
  }

  const modesPart = formatConsultationModesPhrase(practice.consultationModes);
  const tail = modesPart ? `${audiencePart}, ${modesPart}` : audiencePart;
  return `${tail}.`;
}
