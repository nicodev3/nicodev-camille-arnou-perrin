/** Géocodage France (BAN, puis Nominatim en secours) — utilisable au build Astro. */

const BAN_MIN_SCORE = 0.4;

type BanSearchResponse = {
  features?: {
    geometry?: { coordinates?: [number, number] };
    properties?: { score?: number };
  }[];
};

export type LatLng = { lat: number; lon: number };

async function geocodeBan(address: string, postcode?: string): Promise<LatLng | null> {
  const endpoint = new URL("https://api-adresse.data.gouv.fr/search/");
  endpoint.searchParams.set("q", address);
  endpoint.searchParams.set("limit", "1");
  endpoint.searchParams.set("autocomplete", "0");
  if (postcode) endpoint.searchParams.set("postcode", postcode);

  const response = await fetch(endpoint);
  if (!response.ok) return null;

  const data = (await response.json()) as BanSearchResponse;
  const feature = data.features?.[0];
  const coords = feature?.geometry?.coordinates;
  const score = feature?.properties?.score ?? 0;
  if (!coords || coords.length < 2 || score < BAN_MIN_SCORE) return null;

  const [lon, lat] = coords;
  return { lat, lon };
}

async function geocodeNominatim(address: string): Promise<LatLng | null> {
  const endpoint = new URL("https://nominatim.openstreetmap.org/search");
  endpoint.searchParams.set("format", "jsonv2");
  endpoint.searchParams.set("limit", "1");
  endpoint.searchParams.set("countrycodes", "fr");
  endpoint.searchParams.set("accept-language", "fr");
  endpoint.searchParams.set("q", address);

  const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
  if (!response.ok) return null;
  const results: unknown = await response.json();
  if (!Array.isArray(results) || results.length === 0) return null;
  const { lat, lon } = results[0] as { lat: string; lon: string };
  return { lat: Number.parseFloat(lat), lon: Number.parseFloat(lon) };
}

export async function geocodeAddress(address: string, postcode?: string): Promise<LatLng | null> {
  try {
    return (await geocodeBan(address, postcode)) ?? (await geocodeNominatim(address));
  } catch {
    return null;
  }
}

/** Bbox autour d’un point pour l’embed OpenStreetMap (~niveau de zoom 16). */
export function osmEmbedSrc(coords: LatLng): string {
  const { lat, lon } = coords;
  const dLon = 0.01;
  const dLat = 0.006;
  const bbox = `${lon - dLon},${lat - dLat},${lon + dLon},${lat + dLat}`;
  const params = new URLSearchParams({
    bbox,
    layer: "mapnik",
    marker: `${lat},${lon}`,
  });
  return `https://www.openstreetmap.org/export/embed.html?${params}`;
}
