/**
 * Plain-answer guides: each answers one question business owners actually search for, with the direct answer in the
 * first lines (what Google's AI Overviews, ChatGPT and Claude quote). Facts about TrustNova come from the service
 * catalogue only. No prices anywhere on the site: we explain what decides the cost and quote after a consultation.
 */
export type Guide = {
  slug: string;
  nav: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  answer: string;
  sections: { heading: string; text?: string[]; items?: { label?: string; text: string }[] }[];
  faqs: { q: string; a: string }[];
  service: { href: string; label: string };
  updated: string;
};

export const guides: Guide[] = [
  {
    slug: "website-cost-small-business-hyderabad",
    nav: "What decides a website's cost",
    title: "What Decides the Cost of a Small Business Website? | TrustNova",
    description:
      "A website's cost comes down to five things: pages, custom or template design, content, features, and care after launch. What to ask for in a quote, and what to avoid.",
    keywords: ["website cost hyderabad", "website design cost small business india", "how much does a website cost hyderabad"],
    h1: "What decides the cost of a small business website?",
    answer:
      "Five things decide it: how many pages you need, whether the design is custom or a template, who writes the words and supplies the photos, what the site has to do (forms, bookings, payments), and who looks after it after launch. Get every quote to list all five in writing, and you can compare them fairly.",
    sections: [
      {
        heading: "The five things that decide the cost",
        items: [
          { label: "Pages", text: "A local business usually needs Home, About, Services, a portfolio or gallery, and Contact. More pages mean more design, writing and testing." },
          { label: "Custom or template", text: "A template is quicker; a custom design is made around your brand and your customers. Ask which one you're getting, because both are often just called \"a website\"." },
          { label: "Content", text: "Someone has to write every page and supply real photos. If you provide them, the work is smaller; if the designer writes and photographs, it's more." },
          { label: "Features", text: "A contact form and WhatsApp button are simple. Online bookings, payments, several languages or a members' area add real work." },
          { label: "After launch", text: "Hosting, the domain renewal, security updates, backups and small edits. Some designers include a support period; ongoing care is usually a monthly plan." },
        ],
      },
      {
        heading: "Costs people forget",
        items: [
          { text: "The domain name renews every year, in your name." },
          { text: "Hosting is a yearly or monthly bill, separate from the design." },
          { text: "A business email address (you@yourbusiness.in) is often a separate service." },
          { text: "Photos: real photos of your place and work make the biggest difference, and someone has to take them." },
          { text: "Updates after the free support period: new pages, offers and photos." },
        ],
      },
      {
        heading: "What a good quote lists",
        items: [
          { text: "Every page, by name." },
          { text: "Custom design or template, and how many rounds of changes are included." },
          { text: "Who writes the content and who provides the photos." },
          { text: "Every feature: forms, WhatsApp, bookings, payments, analytics." },
          { text: "The platform (WordPress, Webflow or plain HTML) and why it suits you." },
          { text: "The timeline, and what support you get after launch." },
          { text: "That you own the domain, the hosting account and all the files." },
        ],
      },
      {
        heading: "Red flags",
        items: [
          { text: "The domain or hosting is registered in the designer's name, not yours." },
          { text: "No mention of how many changes you can ask for." },
          { text: "\"Lifetime free hosting\": someone always pays for hosting, eventually." },
          { text: "No testing on phones, where most of your customers will see the site." },
          { text: "A quote that doesn't say what happens after launch day." },
        ],
      },
      {
        heading: "How TrustNova quotes",
        text: [
          "Every TrustNova website is custom-designed, mobile-first, up to 8 pages, with contact forms, WhatsApp click-to-chat, basic SEO and Google Analytics 4 set up. We handle the launch (domain, hosting setup and the SSL padlock), test on every device, and give 30 days of support after launch with a handover session.",
          "You own 100% of what we make. We quote after a free consultation, in writing, with no hidden charges, and full websites take 2-4 weeks.",
        ],
      },
    ],
    faqs: [
      { q: "Why doesn't TrustNova list prices?", a: "Because the five things above change from business to business. A short free consultation lets us quote exactly what you need, in writing, with nothing hidden." },
      { q: "Is a one-page website enough?", a: "For a very new business, sometimes. Most local businesses do better with separate pages for services and contact, because each page can be found on Google for its own search." },
      { q: "Do I pay for the website every year?", a: "The design and build are paid once. The domain and hosting renew every year, and ongoing care (updates, backups, monitoring) is optional and monthly." },
      { q: "How long does a website take?", a: "With TrustNova, full websites take 2-4 weeks. The homepage design comes first, so you can change it before the rest is built." },
    ],
    service: { href: "/services/website-design-hyderabad", label: "Website design" },
    updated: "2026-10-28",
  },
  {
    slug: "website-or-instagram-for-small-business",
    nav: "Website or just Instagram?",
    title: "Does My Business Need a Website, or Is Instagram Enough? | TrustNova",
    description:
      "Instagram is for being discovered; a website and Google Business Profile are for being found and trusted. When each one matters, and how they work together.",
    keywords: ["website or instagram for business", "do i need a website for my business india", "instagram vs website small business"],
    h1: "Does my business need a website, or is Instagram enough?",
    answer:
      "Most local businesses need both. Instagram helps people discover you and keeps you in touch with customers; a website and a Google Business Profile help people who are searching find you, check your details and trust you. If you can only start one, start with a complete Google Business Profile and Instagram, then add a simple website.",
    sections: [
      {
        heading: "What Instagram does well",
        items: [
          { text: "Shows your work, products and the people behind them." },
          { text: "Reaches people who weren't looking for you yet." },
          { text: "Keeps regular customers coming back, through posts, stories and DMs." },
        ],
      },
      {
        heading: "Where Instagram falls short",
        items: [
          { text: "You don't own it: reach depends on the algorithm, and an account can be restricted." },
          { text: "People searching Google for \"bakery near me\" or \"dentist in Kukatpally\" rarely land on an Instagram profile." },
          { text: "Opening hours, services, directions and answers to common questions are hard to find in a feed." },
          { text: "AI assistants like ChatGPT and Google's AI Overviews answer from websites and listings, not from Instagram posts." },
        ],
      },
      {
        heading: "What a website adds",
        items: [
          { text: "A page for each service, each able to show up on Google for its own search." },
          { text: "One place with everything a customer checks before calling: services, hours, location, reviews." },
          { text: "WhatsApp and call buttons, so a visitor becomes an enquiry in one tap." },
          { text: "Credibility: many customers look for a website before they trust a new business." },
        ],
      },
      {
        heading: "Which do you need first?",
        items: [
          { label: "Just starting", text: "A complete Google Business Profile and an Instagram account with real photos." },
          { label: "People search for what you do", text: "Add a website, so you show up on Google and in AI answers." },
          { label: "You sell on trust", text: "Clinics, schools, interiors, events: a website is where people check you out before paying." },
          { label: "Your Instagram already works", text: "A website turns that attention into enquiries and gives you something you own." },
        ],
      },
    ],
    faqs: [
      { q: "Can I use my Instagram link as my website?", a: "You can put it on your Google Business Profile, but it won't show up for searches the way a website does, and it can't hold your services, hours and directions in one clear place." },
      { q: "What should I do first, a website or Google Business Profile?", a: "The Google Business Profile: it's free, and it's how people nearby find you on Maps. Link your website to it once you have one." },
      { q: "Does TrustNova do Instagram as well as websites?", a: "Yes. Our social media management covers a content calendar, post design for Instagram, Facebook and LinkedIn, reels planning, posting and a monthly report." },
    ],
    service: { href: "/services/digital-marketing-hyderabad", label: "Digital marketing" },
    updated: "2026-10-28",
  },
  {
    slug: "logo-vs-brand-identity",
    nav: "Logo or full brand identity?",
    title: "Logo vs Brand Identity: Which Does My Business Need? | TrustNova",
    description:
      "A logo is the mark; a brand identity is the full system around it. What each includes, which one your business needs now, and the files you should always get.",
    keywords: ["logo vs brand identity", "brand identity package india", "logo design package what's included"],
    h1: "Logo or brand identity: which does my business need?",
    answer:
      "A logo is the mark that identifies you. A brand identity is the whole system around it: colours, fonts, templates and rules that make everything you print and post look like one business. A new business can start with a logo package; a business that prints, posts and advertises regularly needs the full identity.",
    sections: [
      {
        heading: "What a logo package should include",
        items: [
          { text: "More than one concept to choose from (TrustNova gives 3 unique concepts)." },
          { text: "Refinements until you're happy (ours are unlimited)." },
          { text: "A colour palette with HEX, RGB and CMYK codes, and a font pairing." },
          { text: "Usage guidelines, so the logo is used the same way everywhere." },
          { text: "Every file format: PNG, JPG, SVG, PDF and AI, plus social profile and one-colour versions." },
        ],
      },
      {
        heading: "What a brand identity adds",
        items: [
          { text: "Business card, letterhead and email signature." },
          { text: "Social media post templates in your look." },
          { text: "A full brand style guide (ours is 10-15 pages)." },
          { text: "A WhatsApp Business banner and a favicon for your website." },
        ],
      },
      {
        heading: "Which one do you need?",
        items: [
          { label: "Logo package", text: "You're starting out, or you mainly need a mark for a signboard and Instagram." },
          { label: "Brand identity", text: "You print cards, menus or packaging, post often, run ads, or have more than one person making designs." },
          { label: "Signs you've outgrown logo-only", text: "Your posts and print all look different, and every new design starts from zero." },
        ],
      },
      {
        heading: "The files you should always get",
        items: [
          { text: "A vector file (SVG, PDF or AI) for signboards, banners and printing at any size." },
          { text: "PNG with a transparent background for screens." },
          { text: "A one-colour version for stamps, embroidery and engraving." },
          { text: "A square version for profile pictures." },
        ],
        text: ["If a designer gives you only a PNG, you can't print a sign sharply from it. Ask for the vector file."],
      },
    ],
    faqs: [
      { q: "How long does a logo take?", a: "At TrustNova, logo concepts are ready in 3-5 days. Refinements continue until it feels right." },
      { q: "Do I own my logo?", a: "You should own it outright, with every file. With TrustNova you own 100% of everything we create." },
      { q: "Can I start with a logo and add the identity later?", a: "Yes. The logo package already includes your colours and fonts, so the identity builds on it." },
    ],
    service: { href: "/services/brand-identity-design", label: "Brand identity design" },
    updated: "2026-10-28",
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
