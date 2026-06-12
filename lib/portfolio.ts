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
  href?: string;
};

export const STUDIO_FOUNDER_IMAGE = "/avatar.png";

export const featuredProjects: PortfolioProject[] = [
  {
    id: "vistix",
    number: "01",
    title: "Vistix Engineers",
    category: "HVAC & Industrial Engineering",
    description:
      "React + Vite marketing site for HVAC systems, cleanroom solutions, cold rooms, AHU fabrication and pharmaceutical-grade engineering in Hyderabad.",
    image: "/portfolio/vistix-preview.png",
    panelBg: "#1B2A6B",
    panelText: "#FFFFFF",
  },
  {
    id: "asmc",
    number: "02",
    title: "ASMC",
    category: "Healthcare & Dental",
    description:
      "Premium Next.js website for Asian Speciality Medical Centre LLC, luxury dental clinics across Oman with immersive motion and 3D hero.",
    image: "/portfolio/asmc-preview.png",
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
    description: "Restaurant website with menu showcase, reservations, and warm brand storytelling.",
    industryId: "restaurant",
    panelBg: "#8BA4C4",
    panelText: "#FFFFFF",
  },
  {
    id: "law",
    number: "02",
    title: "Veritas Law",
    category: "Professional",
    description: "Law firm identity with authority-led layout, practice areas, and consultation flows.",
    industryId: "law",
    panelBg: "#E8E0D4",
    panelText: "#0D1117",
  },
  {
    id: "jewellery",
    number: "03",
    title: "Shree Jewels",
    category: "Retail & Products",
    description: "Luxury jewellery storefront with collection grids and trust-first product presentation.",
    industryId: "jewellery",
    panelBg: "#9BB5A0",
    panelText: "#FFFFFF",
  },
  {
    id: "clinic",
    number: "04",
    title: "CarePlus Clinic",
    category: "Health & Wellness",
    description: "Healthcare website focused on appointments, services clarity, and patient confidence.",
    industryId: "clinic",
    panelBg: "#C4674A",
    panelText: "#FFFFFF",
  },
  {
    id: "photography",
    number: "05",
    title: "Lens & Light",
    category: "Creative",
    description: "Photography portfolio with immersive galleries and premium visual hierarchy.",
    industryId: "photographer",
    panelBg: "#F5F3EF",
    panelText: "#0D1117",
  },
];

export const studioExperience = [
  { period: "2024 - Present", role: "Brand & Creative Studio", org: "TrustNova · Hyderabad" },
  { period: "2024", role: "20+ Industry Templates", org: "Sector-specific web systems" },
  { period: "2025", role: "Pan-India Clients", org: "SMEs, startups & local brands" },
];

export const studioTools = ["Figma", "Adobe CC", "Webflow", "WordPress", "Next.js"];
