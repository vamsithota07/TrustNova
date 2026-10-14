/** One page per service, written for the searches people actually make. Every claim here comes from the service catalogue. */
export type ServicePage = {
  slug: string;
  nav: string;
  eyebrow: string;
  h1: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string[];
  includes: { heading: string; items: string[] };
  steps: { title: string; text: string }[];
  fit: { heading: string; items: string[] };
  timeline: string;
  price: string;
  faqs: { q: string; a: string }[];
  schemaName: string;
  startingPrice?: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "logo-design-hyderabad",
    nav: "Logo design",
    eyebrow: "Logo design · Hyderabad",
    h1: "Logo design in Hyderabad for businesses that want to be remembered",
    title: "Logo Design in Hyderabad - Unlimited Revisions | TrustNova",
    description:
      "Custom logo design in Hyderabad. Three unique concepts, unlimited refinements, colour palette, fonts and every file format. Concepts in 3-5 days. From ₹8,000.",
    keywords: ["logo design hyderabad", "logo designer hyderabad", "logo design company hyderabad", "custom logo design india"],
    intro: [
      "Your logo is the first thing a customer sees: on your signboard, your bill, your Google listing and your Instagram page. If it looks like everyone else's, people forget it. If it looks considered, they assume the business behind it is too.",
      "TrustNova is a brand and website studio based in Hyderabad. We design logos from scratch for shops, clinics, restaurants, consultants and startups across India. No templates and no clip art: you see three different directions, choose one, and we refine it until it feels right.",
    ],
    includes: {
      heading: "What you get",
      items: [
        "3 unique initial concepts",
        "Unlimited refinements until you are satisfied",
        "A full brand colour palette (HEX, RGB and CMYK values)",
        "Typography pairing: a primary and a secondary font",
        "A brand usage guidelines document",
        "Final files in PNG, JPG, SVG, PDF and AI",
        "Social media profile versions and monochrome variants",
      ],
    },
    steps: [
      { title: "Tell us about your business", text: "A short call or WhatsApp chat about what you do, who you serve and what you want people to feel." },
      { title: "Pick from three concepts", text: "We present three distinct directions, each shown in real use so you can judge them properly." },
      { title: "Refine until it is right", text: "We adjust the concept you choose, with no limit on revisions, then hand over every file." },
    ],
    fit: {
      heading: "A good fit if",
      items: [
        "You are opening a new business and need a name that looks established from day one",
        "Your current logo was made in a hurry and no longer matches the quality of your work",
        "You have a logo but no proper files, colours or rules for using it",
      ],
    },
    timeline: "Logo concepts are ready in 3-5 days. The total time depends on how many rounds of refinement you want.",
    price: "Logo design starts from ₹8,000. You get a fixed quote after a short discovery call, with no hidden charges.",
    startingPrice: "8000",
    faqs: [
      { q: "How many concepts will I see?", a: "Three. Each is a different idea, not three versions of the same one." },
      { q: "What if I don't like any of them?", a: "Tell us what is missing and we rework the direction. Revisions are unlimited, so you are not charged for changing your mind." },
      { q: "Who owns the logo?", a: "You do. You own 100% of the final files, with no licence fees and no lock-in." },
      { q: "Do you work with businesses outside Hyderabad?", a: "Yes. We are based in Hyderabad and work with clients across India over call, WhatsApp and email." },
    ],
    schemaName: "Logo Design",
  },
  {
    slug: "brand-identity-design",
    nav: "Brand identity",
    eyebrow: "Brand identity · Hyderabad & India",
    h1: "Brand identity design: one consistent look across everything you put out",
    title: "Brand Identity Design in Hyderabad | TrustNova",
    description:
      "Complete brand identity package: logo, colours, fonts, business cards, letterhead, social media templates and a brand style guide. From ₹18,000. Based in Hyderabad.",
    keywords: ["brand identity design hyderabad", "branding agency hyderabad", "brand identity package india", "business card and letterhead design"],
    intro: [
      "A logo is one mark. A brand identity is the whole system around it: the colours, the fonts, the stationery, the templates and the rules that keep them consistent. Without that system, a business ends up with one look on its board, another on its bill and a third on Instagram.",
      "Our brand identity package gives you everything in one go, so every card you hand over and every post you publish looks like it came from the same business. Recognition comes from repetition, and repetition needs a system.",
    ],
    includes: {
      heading: "What the package includes",
      items: [
        "Everything in our logo design service",
        "Business card design, with print-ready files",
        "Letterhead and a professional email signature",
        "5 customisable social media post templates",
        "A brand style guide (a 10-15 page PDF)",
        "A WhatsApp Business profile banner",
        "A brand icon and favicon for digital use",
      ],
    },
    steps: [
      { title: "Start with the logo", text: "We design or refine the mark first, because everything else is built from it." },
      { title: "Build the system", text: "Colours, fonts, stationery and templates are designed together so they match." },
      { title: "Hand over the guide", text: "You receive the files and a style guide that tells anyone, including a printer or a new employee, how to use them." },
    ],
    fit: {
      heading: "A good fit if",
      items: [
        "Your materials were made at different times by different people and no longer match",
        "You are about to print cards, signage or packaging and want them right the first time",
        "You post on social media regularly and want every post to be recognisably yours",
      ],
    },
    timeline: "Logo concepts take 3-5 days. The full package follows once the logo is approved; we agree the schedule with you at the start.",
    price: "The complete brand identity package starts from ₹18,000, with a fixed quote after a discovery call.",
    startingPrice: "18000",
    faqs: [
      { q: "I already have a logo. Can you build the rest around it?", a: "Yes. We can refine the existing logo if needed and design the rest of the identity to match it." },
      { q: "What is a brand style guide?", a: "A short document showing your logo, colours and fonts and how to use them, so that anyone producing material for you keeps it consistent." },
      { q: "Do you print the business cards?", a: "We supply print-ready files that any printer can use. Printing itself is arranged by you." },
      { q: "Who owns the designs?", a: "You own 100% of the files. There are no recurring licence fees." },
    ],
    schemaName: "Brand Identity Design",
  },
  {
    slug: "website-design-hyderabad",
    nav: "Website design",
    eyebrow: "Website design · Hyderabad",
    h1: "Website design in Hyderabad, built to bring you enquiries",
    title: "Website Design in Hyderabad - Live in 2-4 Weeks | TrustNova",
    description:
      "Custom, mobile-first website design in Hyderabad. Up to 8 pages, WhatsApp click-to-chat, basic SEO and Google Analytics. Live in 2-4 weeks. From ₹25,000.",
    keywords: ["website design hyderabad", "web designer hyderabad", "website development company hyderabad", "small business website india"],
    intro: [
      "Most of your customers look you up on their phone before they call or visit. If they find a slow, confusing site, or no site at all, they move on to the next result. A website's job is simple: say clearly what you do, look trustworthy, and make it easy to get in touch.",
      "We design and build custom websites for businesses in Hyderabad and across India. Each one is designed around your brand, built for phones first, and set up so that a visitor can message you on WhatsApp in one tap.",
    ],
    includes: {
      heading: "What is included",
      items: [
        "A custom design tailored to your brand and goals",
        "Mobile-first and responsive on every device",
        "Up to 8 pages: Home, About, Services, Portfolio, Blog and Contact",
        "Contact forms and WhatsApp click-to-chat",
        "Basic SEO setup: meta titles, descriptions and a sitemap",
        "Google Analytics 4",
        "Built on WordPress, Webflow or static HTML, whichever suits you",
        "Launch support: DNS, deployment, SSL and testing across devices",
        "30 days of post-launch support and a handover session",
      ],
    },
    steps: [
      { title: "Plan the pages", text: "We agree what the site needs to say and what you want a visitor to do." },
      { title: "Design, then build", text: "You approve the design before we build it, so there are no surprises." },
      { title: "Launch and support", text: "We handle the technical launch and stay with you for 30 days afterwards." },
    ],
    fit: {
      heading: "A good fit if",
      items: [
        "You have no website and are relying on Instagram or a Google listing alone",
        "Your current site looks dated or is hard to use on a phone",
        "You get visitors but few of them call, message or fill in the form",
      ],
    },
    timeline: "A full website is typically live in 2-4 weeks, depending on how quickly content and feedback come in.",
    price: "Websites start from ₹25,000. Domain and hosting are bought by you and stay in your name; we quote a fixed price for the design and build.",
    startingPrice: "25000",
    faqs: [
      { q: "Will I be able to update the site myself?", a: "Yes. We include a handover session, and if you prefer, our monthly maintenance plan covers updates for you." },
      { q: "Who owns the website?", a: "You do: the design, the code and the content. The domain and hosting are in your name, so you are never locked in." },
      { q: "Does it include SEO?", a: "It includes the basic setup every site needs: page titles, descriptions and a sitemap. Ongoing SEO is part of our digital marketing plans." },
      { q: "Do I need to buy hosting first?", a: "No. We advise you on what to buy and set it all up as part of the launch." },
    ],
    schemaName: "Website Design & Development",
  },
  {
    slug: "digital-marketing-hyderabad",
    nav: "Digital marketing",
    eyebrow: "Digital marketing · Hyderabad",
    h1: "Digital marketing in Hyderabad that aims at enquiries, not just likes",
    title: "Digital Marketing in Hyderabad - SEO, Social & Ads | TrustNova",
    description:
      "Digital marketing for Hyderabad businesses: SEO, Google Business Profile, social media and Google & Meta ads, with clear monthly reporting. Free consultation.",
    keywords: ["digital marketing hyderabad", "seo services hyderabad", "google business profile optimisation", "social media marketing hyderabad"],
    intro: [
      "A good website still needs people to find it. That takes steady work in a few places: showing up when someone searches on Google, having a complete Google Business Profile, posting consistently, and running ads that are aimed at a result.",
      "We run digital marketing on monthly plans for businesses in Hyderabad and across India. Every plan starts with a free consultation, because the right mix for a clinic is not the right mix for a restaurant or a coaching centre.",
    ],
    includes: {
      heading: "What we can cover",
      items: [
        "A digital marketing strategy and monthly growth roadmap",
        "Google Business Profile optimisation for local discovery",
        "SEO foundations, content priorities and on-page improvements",
        "Social media content planning and campaign creative",
        "Meta and Google Ads campaign setup and optimisation",
        "Content, WhatsApp and email campaigns",
        "Clear monthly reporting on reach, leads and next actions",
      ],
    },
    steps: [
      { title: "Free consultation", text: "We look at where you are now and what you want more of: calls, bookings, walk-ins or orders." },
      { title: "A plan that fits", text: "We propose a monthly plan matched to your goals and budget, and explain what each part is for." },
      { title: "Run, report, adjust", text: "Each month you get a plain report of what was done, what it produced and what comes next." },
    ],
    fit: {
      heading: "A good fit if",
      items: [
        "You have boosted posts or run ads before and could not tell what they achieved",
        "Competitors appear above you on Google or Google Maps",
        "You want one team to handle your website and your marketing together",
      ],
    },
    timeline: "Ads can start within days of agreeing a plan. SEO builds gradually over months; we will not promise overnight rankings.",
    price: "Digital marketing is priced as a monthly plan, scoped to your goals and budget after the free consultation.",
    faqs: [
      { q: "Can you guarantee the first page of Google?", a: "No, and nobody honestly can. We can make sure your site and Google profile are set up properly, improve them steadily, and show you the results each month." },
      { q: "How long before I see results?", a: "Ads and a complete Google Business Profile can bring enquiries quickly. SEO is slower and usually takes a few months to show." },
      { q: "Is there a long contract?", a: "Plans run month to month. We agree the scope with you up front so you know what you are paying for." },
      { q: "Do I need a website first?", a: "It helps a great deal, because ads and search results need somewhere to send people. We can build that for you too." },
    ],
    schemaName: "Digital Marketing",
  },
];

export const servicePageBySlug = (slug: string) => servicePages.find((p) => p.slug === slug);
