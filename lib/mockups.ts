/** Maps industry card id → HTML filename in /public/mockups/ */
const MOCKUP_FILE_MAP: Record<string, string> = {
  jewellery: "jewellery",
  clothing: "fashion",
  electronics: "electronics",
  furniture: "furniture",
  restaurant: "restaurant",
  catering: "catering",
  hotel: "hotel",
  interior: "interior",
  "real-estate": "realestate",
  ca: "ca",
  law: "lawfirm",
  architect: "architect",
  clinic: "clinic",
  gym: "gym",
  salon: "salon",
  coaching: "coaching",
  training: "training",
  photographer: "photography",
  events: "events",
  "digital-marketing": "marketing",
};

const MOCKUP_URL_MAP: Record<string, string> = {
  jewellery: "www.shreejewels.in",
  clothing: "www.voguethreads.in",
  electronics: "www.techhubstore.in",
  furniture: "www.homecraft.in",
  restaurant: "www.spiceroute.in",
  catering: "www.feastevents.in",
  hotel: "www.staycomfort.in",
  interior: "www.spacestudio.in",
  "real-estate": "www.primeproperties.in",
  ca: "www.ledgerpro.in",
  law: "www.veritaslaw.in",
  architect: "www.blueprintco.in",
  clinic: "www.careplusclinic.in",
  gym: "www.ironforgegym.in",
  salon: "www.glowstudio.in",
  coaching: "www.rankmasters.in",
  training: "www.skillforge.in",
  photographer: "www.lensandlight.in",
  events: "www.grandstage.in",
  "digital-marketing": "www.growdigital.in",
};

export function getMockupFile(industryId: string): string {
  return MOCKUP_FILE_MAP[industryId] ?? industryId;
}

/** Bump when mockup assets change so browsers refetch iframe previews. */
const MOCKUP_CACHE_VERSION = "2";

export function getMockupHtmlPath(industryId: string): string {
  return `/mockups/${getMockupFile(industryId)}.html?v=${MOCKUP_CACHE_VERSION}`;
}

export function getMockupUrl(industryId: string): string {
  return MOCKUP_URL_MAP[industryId] ?? "www.yourbusiness.com";
}

export const MOCKUP_WIDTH = 1440;
export const MOCKUP_HEIGHT = 900;
