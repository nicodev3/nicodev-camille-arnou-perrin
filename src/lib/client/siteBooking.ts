import { SITE_BOOKING_PRIMARY_HREF, SITE_BOOKING_PRIMARY_LABEL } from "../constants.ts";
import type { ClientConfig } from "./schema.ts";

/** URL du CTA « Prendre rendez-vous » : profil Doctolib du praticien, sinon fallback template. */
export function resolvedBookingPrimaryHref(client: ClientConfig): string {
  const url = client.contact.bookingUrl?.trim();
  return url && url.length > 0 ? url : SITE_BOOKING_PRIMARY_HREF;
}

export function bookingPrimaryIsExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

/**
 * Attributs Umami d'un bouton « Prendre rendez-vous » : un seul événement `prise-rdv`,
 * distingué par `emplacement` (header, hero, footer…) dans le tableau de bord.
 */
export function bookingTrackingAttrs(emplacement: string): Record<string, string> {
  return {
    "data-umami-event": "prise-rdv",
    "data-umami-event-emplacement": emplacement,
  };
}

export { SITE_BOOKING_PRIMARY_LABEL };
