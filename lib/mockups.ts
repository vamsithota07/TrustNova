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

// sample designs, not real businesses: the address bar says so, and never shows someone else's real domain
const MOCKUP_URL_MAP: Record<string, string> = {
  jewellery: "concept.trustnova.in/jewellery",
  clothing: "concept.trustnova.in/clothing",
  electronics: "concept.trustnova.in/electronics",
  furniture: "concept.trustnova.in/furniture",
  restaurant: "concept.trustnova.in/restaurant",
  catering: "concept.trustnova.in/catering",
  hotel: "concept.trustnova.in/hotel",
  interior: "concept.trustnova.in/interior",
  "real-estate": "concept.trustnova.in/real-estate",
  ca: "concept.trustnova.in/ca",
  law: "concept.trustnova.in/law",
  architect: "concept.trustnova.in/architect",
  clinic: "concept.trustnova.in/clinic",
  gym: "concept.trustnova.in/gym",
  salon: "concept.trustnova.in/salon",
  coaching: "concept.trustnova.in/coaching",
  training: "concept.trustnova.in/training",
  photographer: "concept.trustnova.in/photographer",
  events: "concept.trustnova.in/events",
  "digital-marketing": "concept.trustnova.in/digital-marketing",
};

export function getMockupFile(industryId: string): string {
  return MOCKUP_FILE_MAP[industryId] ?? industryId;
}

/** Bump when mockup assets change so browsers refetch iframe previews. */
const MOCKUP_CACHE_VERSION = "3";

export function getMockupHtmlPath(industryId: string): string {
  return `/mockups/${getMockupFile(industryId)}.html?v=${MOCKUP_CACHE_VERSION}`;
}

export function getMockupUrl(industryId: string): string {
  return MOCKUP_URL_MAP[industryId] ?? "www.yourbusiness.com";
}

export const MOCKUP_WIDTH = 1440;
export const MOCKUP_HEIGHT = 900;
