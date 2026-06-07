import type { LucideIcon } from "lucide-react";
import {
  Gem,
  Shirt,
  Cpu,
  Armchair,
  UtensilsCrossed,
  ChefHat,
  Hotel,
  PaintBucket,
  Building2,
  Calculator,
  Scale,
  Compass,
  Stethoscope,
  Dumbbell,
  Sparkles,
  GraduationCap,
  BookOpen,
  Camera,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

export type IndustryCategory =
  | "Retail & Products"
  | "Food & Hospitality"
  | "Services"
  | "Professional"
  | "Health & Wellness"
  | "Education"
  | "Creative";

export const filterOptions = [
  "ALL",
  "Retail & Products",
  "Services",
  "Food & Hospitality",
  "Professional",
  "Health & Wellness",
  "Education",
  "Creative",
] as const;

export type FilterOption = (typeof filterOptions)[number];

export interface IndustryCard {
  id: string;
  name: string;
  icon: LucideIcon;
  category: IndustryCategory;
  tagline: string;
  needs: string[];
  pages: string[];
  specialFeature: {
    title: string;
    description: string;
  };
}

export const industryCards: IndustryCard[] = [
  {
    id: "jewellery",
    name: "Jewellery Shop",
    icon: Gem,
    category: "Retail & Products",
    tagline:
      "Selling gold, silver, diamond jewellery to walk-in and online customers",
    needs: [
      "High-quality product photo galleries",
      "Category filters (gold, silver, diamond, occasion)",
      "Price range and weight display per item",
      'WhatsApp "Enquire Now" on every product',
      "Festival and seasonal offer banners",
      "Store location with Google Maps embed",
    ],
    pages: [
      "Home",
      "Collections",
      "Gold",
      "Silver",
      "Diamond",
      "Occasion Wear",
      "Offers",
      "About Us",
      "Contact",
    ],
    specialFeature: {
      title: "Virtual Try-On Ready",
      description:
        "We set up the product pages so you can plug in a virtual jewellery try-on tool when you're ready.",
    },
  },
  {
    id: "clothing",
    name: "Clothing & Fashion Store",
    icon: Shirt,
    category: "Retail & Products",
    tagline: "Men's, women's, or kids fashion - boutique or multi-brand store",
    needs: [
      "Lookbook style photo galleries",
      "Size guide and fit information",
      "New arrivals and trending section",
      "Instagram feed integration",
      "WhatsApp order and enquiry buttons",
      "Seasonal sale and discount banners",
    ],
    pages: [
      "Home",
      "Men",
      "Women",
      "Kids",
      "New Arrivals",
      "Sale",
      "Lookbook",
      "Size Guide",
      "Contact",
    ],
    specialFeature: {
      title: "Instagram Shop Ready",
      description:
        "Product pages built to sync with your Instagram shopping catalog.",
    },
  },
  {
    id: "electronics",
    name: "Electronics & Gadgets Store",
    icon: Cpu,
    category: "Retail & Products",
    tagline: "Mobile phones, laptops, accessories, repair services",
    needs: [
      "Product comparison feature",
      "Specification tables for each product",
      "EMI and payment option display",
      "Repair service booking form",
      "Brand filter (Samsung, Apple, etc.)",
      "WhatsApp for price enquiry",
    ],
    pages: [
      "Home",
      "Mobiles",
      "Laptops",
      "Accessories",
      "Repair Services",
      "Brands",
      "Offers",
      "Contact",
    ],
    specialFeature: {
      title: "Price Enquiry System",
      description:
        "Customers click 'Get Best Price' and it opens WhatsApp with product name pre-filled.",
    },
  },
  {
    id: "furniture",
    name: "Furniture & Home Decor",
    icon: Armchair,
    category: "Retail & Products",
    tagline:
      "Custom furniture, ready-made pieces, interior decor and accessories",
    needs: [
      "Room-wise product categories",
      "Custom order enquiry form",
      "Before/after project gallery",
      "Material and finish options display",
      "Home visit booking for measurement",
      "Video walkthroughs of showroom",
    ],
    pages: [
      "Home",
      "Living Room",
      "Bedroom",
      "Kitchen",
      "Office",
      "Custom Orders",
      "Gallery",
      "Contact",
    ],
    specialFeature: {
      title: "Project Showcase Gallery",
      description:
        "A dedicated section to show completed home projects - builds trust instantly.",
    },
  },
  {
    id: "restaurant",
    name: "Restaurant & Cafe",
    icon: UtensilsCrossed,
    category: "Food & Hospitality",
    tagline:
      "Dine-in restaurant, cafe, or cloud kitchen serving local customers",
    needs: [
      "Full digital menu with photos and prices",
      "Table reservation form",
      "Zomato / Swiggy order buttons",
      "Chef specials and seasonal menu section",
      "Private dining and event booking",
      "Google Maps and parking info",
    ],
    pages: [
      "Home",
      "Menu",
      "Reservations",
      "Private Dining",
      "Gallery",
      "About Chef",
      "Contact",
    ],
    specialFeature: {
      title: "Digital Menu QR Code",
      description:
        "We create a scannable QR code that opens your menu - customers scan at the table.",
    },
  },
  {
    id: "catering",
    name: "Catering & Events",
    icon: ChefHat,
    category: "Food & Hospitality",
    tagline:
      "Wedding catering, corporate events, home delivery catering services",
    needs: [
      "Event type packages (wedding, corporate, birthday)",
      "Menu customisation enquiry form",
      "Photo gallery of past events",
      "Capacity and service area information",
      "Client testimonial section",
      "WhatsApp instant quote button",
    ],
    pages: [
      "Home",
      "Services",
      "Wedding Catering",
      "Corporate Events",
      "Menu",
      "Gallery",
      "Contact",
    ],
    specialFeature: {
      title: "Instant Quote Form",
      description:
        "Customers fill event type, guest count, and date - you get a WhatsApp notification instantly.",
    },
  },
  {
    id: "hotel",
    name: "Hotel & Guest House",
    icon: Hotel,
    category: "Food & Hospitality",
    tagline:
      "Budget hotel, boutique stay, or guest house for travellers and business guests",
    needs: [
      "Room types with photos and amenities",
      "Direct booking form (no commission)",
      "Pricing per room per night",
      "Nearby attractions and transport info",
      "Corporate booking enquiry",
      "TripAdvisor / Google reviews integration",
    ],
    pages: [
      "Home",
      "Rooms",
      "Amenities",
      "Gallery",
      "Dining",
      "Location",
      "Book Now",
      "Contact",
    ],
    specialFeature: {
      title: "Direct Booking - Zero Commission",
      description:
        "Guests book directly through your site. No OTA commission. More profit per booking.",
    },
  },
  {
    id: "interior",
    name: "Interior Designer",
    icon: PaintBucket,
    category: "Services",
    tagline:
      "Residential and commercial interior design - turnkey and consultation services",
    needs: [
      "Portfolio gallery with project categories",
      "Before and after transformation photos",
      "Service packages and pricing",
      "Free consultation booking form",
      "Client testimonials with project photos",
      "Style quiz to capture leads",
    ],
    pages: [
      "Home",
      "Portfolio",
      "Services",
      "Residential",
      "Commercial",
      "Process",
      "About",
      "Contact",
    ],
    specialFeature: {
      title: "Style Quiz Lead Capture",
      description:
        "Visitors answer 5 style questions - you get their details and their design preferences.",
    },
  },
  {
    id: "real-estate",
    name: "Real Estate Agency",
    icon: Building2,
    category: "Services",
    tagline:
      "Property buying, selling, renting - residential and commercial real estate",
    needs: [
      "Property listing with filters (location, price, type)",
      "High quality photo and video per property",
      "EMI calculator tool",
      "Site visit booking form",
      "Builder and project pages",
      "WhatsApp enquiry on every listing",
    ],
    pages: [
      "Home",
      "Buy",
      "Rent",
      "Commercial",
      "New Projects",
      "EMI Calculator",
      "About",
      "Contact",
    ],
    specialFeature: {
      title: "EMI Calculator",
      description:
        "Buyers enter property price and see monthly EMI instantly - keeps them on your site longer.",
    },
  },
  {
    id: "ca",
    name: "CA / Accountant / Tax Consultant",
    icon: Calculator,
    category: "Professional",
    tagline:
      "Chartered accountant, tax filing, GST, audit, and financial advisory services",
    needs: [
      "Service list with clear descriptions",
      "Tax deadline calendar or reminder tool",
      "Client portal login (future ready)",
      "Document upload enquiry form",
      "Blog for tax tips and updates",
      "Appointment booking form",
    ],
    pages: [
      "Home",
      "Services",
      "GST Filing",
      "Tax Planning",
      "Audit",
      "Blog",
      "About",
      "Contact",
    ],
    specialFeature: {
      title: "Tax Deadline Reminder",
      description:
        "A visible calendar showing upcoming GST, ITR deadlines - clients bookmark this page.",
    },
  },
  {
    id: "law",
    name: "Law Firm / Advocate",
    icon: Scale,
    category: "Professional",
    tagline:
      "Legal services - corporate, family, property, criminal, or civil law",
    needs: [
      "Practice area pages with clear explanations",
      "Attorney profiles with credentials",
      "Case consultation booking form",
      "Legal blog and resources",
      "Confidential enquiry form",
      "Office location and court proximity",
    ],
    pages: [
      "Home",
      "Practice Areas",
      "Our Team",
      "Blog",
      "Resources",
      "Testimonials",
      "Contact",
    ],
    specialFeature: {
      title: "Confidential Enquiry Form",
      description:
        "Encrypted form where clients can describe their case privately before calling.",
    },
  },
  {
    id: "architect",
    name: "Architect / Construction Firm",
    icon: Compass,
    category: "Professional",
    tagline:
      "Architecture, structural design, construction and project management",
    needs: [
      "Project portfolio with categories",
      "Floor plan and 3D render gallery",
      "Service timeline and process explained",
      "Cost estimation enquiry form",
      "Awards and certifications section",
      "Blog for design trends and tips",
    ],
    pages: [
      "Home",
      "Portfolio",
      "Residential",
      "Commercial",
      "Services",
      "Process",
      "About",
      "Contact",
    ],
    specialFeature: {
      title: "Interactive Project Gallery",
      description:
        "Clients filter by project type, budget range, and city to find relevant past work.",
    },
  },
  {
    id: "clinic",
    name: "Clinic / Doctor",
    icon: Stethoscope,
    category: "Health & Wellness",
    tagline:
      "General physician, specialist clinic, or multi-specialty healthcare provider",
    needs: [
      "Doctor profiles with qualifications",
      "Online appointment booking",
      "Service and treatment list",
      "Patient FAQ section",
      "Insurance and payment information",
      "Emergency contact prominently placed",
    ],
    pages: [
      "Home",
      "Doctors",
      "Services",
      "Appointments",
      "Patient Info",
      "Blog",
      "Contact",
    ],
    specialFeature: {
      title: "Online Appointment System",
      description:
        "Patients book slots directly - reduces front desk calls by up to 60%.",
    },
  },
  {
    id: "gym",
    name: "Gym & Fitness Studio",
    icon: Dumbbell,
    category: "Health & Wellness",
    tagline: "Gym, fitness studio, yoga centre, or CrossFit box",
    needs: [
      "Membership plans and pricing",
      "Class schedule and timetable",
      "Trainer profiles",
      "Free trial / first class booking",
      "Transformation gallery",
      "Supplement and merchandise store",
    ],
    pages: [
      "Home",
      "Memberships",
      "Classes",
      "Trainers",
      "Schedule",
      "Gallery",
      "Shop",
      "Contact",
    ],
    specialFeature: {
      title: "Class Timetable",
      description:
        "Live weekly schedule - members check class timings without calling the gym.",
    },
  },
  {
    id: "salon",
    name: "Beauty Salon & Spa",
    icon: Sparkles,
    category: "Health & Wellness",
    tagline: "Hair salon, beauty parlour, nail studio, or full-service spa",
    needs: [
      "Service menu with prices",
      "Appointment booking with stylist selection",
      "Before and after gallery",
      "Loyalty program information",
      "Product retail section",
      "Gift voucher purchase page",
    ],
    pages: [
      "Home",
      "Services",
      "Book Appointment",
      "Gallery",
      "Products",
      "Gift Cards",
      "About",
      "Contact",
    ],
    specialFeature: {
      title: "Online Booking with Stylist Choice",
      description:
        "Clients pick their preferred stylist and time slot - reduces no-shows significantly.",
    },
  },
  {
    id: "coaching",
    name: "Coaching Centre / Tuition",
    icon: GraduationCap,
    category: "Education",
    tagline:
      "Academic coaching, competitive exam prep, or subject-specific tuition centre",
    needs: [
      "Course and subject listings",
      "Batch timings and fee structure",
      "Faculty profiles and qualifications",
      "Student results and achievements",
      "Free demo class booking",
      "Study material download section",
    ],
    pages: [
      "Home",
      "Courses",
      "Faculty",
      "Results",
      "Batches",
      "Demo Class",
      "Resources",
      "Contact",
    ],
    specialFeature: {
      title: "Results Wall",
      description:
        "A dedicated page showing student achievements and scores - the most powerful trust signal.",
    },
  },
  {
    id: "training",
    name: "Skill Development / Training Institute",
    icon: BookOpen,
    category: "Education",
    tagline:
      "Vocational training, professional certification, or soft skills development",
    needs: [
      "Course catalogue with duration and fees",
      "Certification and accreditation display",
      "Placement and alumni success stories",
      "Online enrollment form",
      "Free webinar or demo session booking",
      "Corporate training enquiry",
    ],
    pages: [
      "Home",
      "Courses",
      "Certifications",
      "Placements",
      "Corporate Training",
      "About",
      "Enroll",
      "Contact",
    ],
    specialFeature: {
      title: "Placement Success Stories",
      description:
        "Real alumni outcomes displayed prominently - converts more enrollments than anything else.",
    },
  },
  {
    id: "photographer",
    name: "Photographer / Videographer",
    icon: Camera,
    category: "Creative",
    tagline:
      "Wedding, commercial, portrait, or product photography and videography",
    needs: [
      "Full-screen portfolio gallery",
      "Shoot type categories (wedding, corporate, etc.)",
      "Package and pricing page",
      "Behind the scenes content",
      "Booking and availability form",
      "Video reel embed (YouTube/Vimeo)",
    ],
    pages: [
      "Home",
      "Portfolio",
      "Wedding",
      "Commercial",
      "Portraits",
      "Pricing",
      "About",
      "Book Now",
    ],
    specialFeature: {
      title: "Full-Screen Immersive Gallery",
      description:
        "Images fill the screen completely - lets the photography speak for itself.",
    },
  },
  {
    id: "events",
    name: "Event Management Company",
    icon: CalendarDays,
    category: "Creative",
    tagline:
      "Corporate events, weddings, product launches, and private celebrations",
    needs: [
      "Event type service pages",
      "Past event gallery and video highlights",
      "Vendor network and partnerships",
      "Budget range and package options",
      "Event inquiry form with date selector",
      "Corporate client logos section",
    ],
    pages: [
      "Home",
      "Services",
      "Weddings",
      "Corporate",
      "Gallery",
      "Vendors",
      "About",
      "Contact",
    ],
    specialFeature: {
      title: "Event Inquiry with Date Picker",
      description:
        "Clients select event date and type - you immediately see availability conflicts.",
    },
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing Agency",
    icon: TrendingUp,
    category: "Creative",
    tagline: "SEO, social media, paid ads, and content marketing services",
    needs: [
      "Service pages with clear ROI focus",
      "Case study portfolio with results",
      "Industry specialisation sections",
      "Free audit or consultation offer",
      "Blog with marketing insights",
      "Client logo and results wall",
    ],
    pages: [
      "Home",
      "Services",
      "SEO",
      "Social Media",
      "Ads",
      "Case Studies",
      "Blog",
      "Free Audit",
      "Contact",
    ],
    specialFeature: {
      title: "Free Audit Lead Magnet",
      description:
        "Visitors enter their website URL for a free SEO audit - captures warm leads daily.",
    },
  },
];
