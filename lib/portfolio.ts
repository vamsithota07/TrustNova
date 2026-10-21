export type PortfolioProject = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  panelBg: string;
  panelText: string;
  industryId?: string;
  image?: string;
  imageAspect?: "wide";
  imageAlt: string;
  href?: string;
  variant?: "campaign";
};

export const STUDIO_FOUNDER_IMAGE = "/avatar.png";

export const featuredProjects: PortfolioProject[] = [
  {
    id: "milletio-global-grain",
    number: "01",
    title: "Milletio Global Grain",
    category: "Digital Marketing",
    description: "Digital marketing for Milletio Global Grain: campaign creative, social storytelling and a growth-focused channel strategy.",
    panelBg: "#546B47",
    panelText: "#FFFFFF",
    image: "/portfolio/milletio-global-grain.png",
    imageAspect: "wide",
    imageAlt: "Milletio Global Grain digital marketing portfolio by TrustNova",
    href: "https://www.milletioglobalgrain.com/",
  },
  {
    id: "vistix",
    number: "02",
    title: "Vistix Engineers",
    category: "HVAC & Industrial Engineering",
    description:
      "React + Vite marketing site for HVAC systems, cleanroom solutions, cold rooms, AHU fabrication and pharmaceutical-grade engineering in Hyderabad.",
    image: "/portfolio/vistix-preview.png",
    imageAlt: "HVAC engineering website design by TrustNova Hyderabad",
    href: "https://vistixengineers.com/",
    panelBg: "#1B2A6B",
    panelText: "#FFFFFF",
  },
  {
    id: "asmc",
    number: "03",
    title: "ASMC",
    category: "Healthcare & Dental",
    description:
      "Premium Next.js website for Asian Speciality Medical Centre LLC, luxury dental clinics across Oman with immersive motion and 3D hero.",
    image: "/portfolio/asmc-preview.png",
    imageAlt: "Dental clinic website design by TrustNova",
    panelBg: "#0F2A3D",
    panelText: "#FFFFFF",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "restaurant",
    number: "01",
    title: "Spice Route",
    category: "Food & Hospitality",
    description: "Sample restaurant website we designed: menu showcase, reservations and warm brand storytelling.",
    industryId: "restaurant",
    imageAlt: "Restaurant website design by TrustNova",
    panelBg: "#8BA4C4",
    panelText: "#FFFFFF",
  },
  {
    id: "law",
    number: "02",
    title: "Veritas Law",
    category: "Professional",
    description: "Sample law firm website we designed: authority-led layout, practice areas and consultation flows.",
    industryId: "law",
    imageAlt: "Law firm website design by TrustNova Hyderabad",
    panelBg: "#EFE6DE",
    panelText: "#0D1117",
  },
  {
    id: "jewellery",
    number: "03",
    title: "Shree Jewels",
    category: "Retail & Products",
    description: "Sample jewellery storefront we designed: collection grids and trust-first product presentation.",
    industryId: "jewellery",
    imageAlt: "Jewellery shop website design by TrustNova Hyderabad",
    panelBg: "#9BB5A0",
    panelText: "#FFFFFF",
  },
  {
    id: "clinic",
    number: "04",
    title: "CarePlus Clinic",
    category: "Health & Wellness",
    description: "Sample clinic website we designed: appointments, clear services and patient confidence.",
    industryId: "clinic",
    imageAlt: "Clinic website design by TrustNova Hyderabad",
    panelBg: "#B5482A",
    panelText: "#FFFFFF",
  },
  {
    id: "photography",
    number: "05",
    title: "Lens & Light",
    category: "Creative",
    description: "Sample photography portfolio we designed: immersive galleries and a premium visual hierarchy.",
    industryId: "photographer",
    imageAlt: "Photography studio website design by TrustNova",
    panelBg: "#FAF6F2",
    panelText: "#0D1117",
  },
];

export const studioExperience = [
  { period: "2024 - Present", role: "Brand & Creative Studio", org: "TrustNova · Hyderabad" },
  { period: "2024", role: "20+ Industry Concept Designs", org: "Sample websites for each sector" },
  { period: "2025", role: "Pan-India Clients", org: "SMEs, startups & local brands" },
];

export const studioTools = ["Figma", "Adobe CC", "Webflow", "WordPress", "Next.js"];
