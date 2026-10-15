/**
 * Converts a string to a URL-friendly slug usable as an HTML id.
 * Handles French accented characters and special punctuation.
 */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric sequences with a hyphen
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}
