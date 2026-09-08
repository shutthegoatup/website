export const site = {
  name: "Shut The Goat Up",
  shortName: "STGU",
  domain: "shutthegoatup.com",
  url: "https://shutthegoatup.com",
  email: "hello@shutthegoatup.com",
  tagline: "Every category has a GOAT. We come for it.",
  description:
    "Shut The Goat Up is a product engineering company from Edinburgh. We build software that takes on the incumbents — real-time 3D, payments, and the platforms underneath them.",
  legalEntity: "Secureweb Ltd",
  companyNumber: "SC452364",
  jurisdiction: "Registered in Scotland",
  address: "Hudson House, 8 Albany Street, Edinburgh, EH1 3QB",
  social: {
    linkedin: "https://www.linkedin.com/company/secureweb",
    gitlab: "https://gitlab.com/secureweb",
  },
} as const;

export type ProductStatus = "live" | "building" | "classified";

export interface Product {
  readonly name: string;
  readonly status: ProductStatus;
  readonly category: string;
  readonly blurb: string;
  readonly takes: string;
  readonly href: string | null;
}

export const products: readonly Product[] = [
  {
    name: "RenderApp",
    status: "live",
    category: "Real-time 3D",
    blurb:
      "Photoreal, interactive 3D streamed to any browser — no plugin, no workstation, no download. Configurators and visualisation that used to need a render farm and a fortnight.",
    takes: "Render farms and desktop-only visualisation suites",
    href: "https://renderapp.io",
  },
  {
    name: "Positron",
    status: "building",
    category: "Payments",
    blurb:
      "A multi-tenant point-of-sale platform: merchant API, dashboard and terminal app. Built for operators who resent paying a percentage of their business for a card reader.",
    takes: "The incumbent POS duopoly",
    href: null,
  },
  {
    name: "Gruff",
    status: "classified",
    category: "Undisclosed",
    blurb:
      "Not announced. Not a landing page with a waitlist. It ships when it is good enough to embarrass something expensive.",
    takes: "Something that has had it too easy for too long",
    href: null,
  },
] as const;

export interface Capability {
  readonly index: string;
  readonly title: string;
  readonly body: string;
}

export const capabilities: readonly Capability[] = [
  {
    index: "01",
    title: "Product engineering",
    body: "Senior people writing the actual software. Small teams, short cycles, and a working build in front of you every week.",
  },
  {
    index: "02",
    title: "Platform engineering",
    body: "Kubernetes, infrastructure as code, and pipelines that deploy on merge. The boring machinery that makes shipping fast unremarkable.",
  },
  {
    index: "03",
    title: "Reliability",
    body: "SRE practice applied properly: error budgets, real observability, and on-call that a human being can live with.",
  },
  {
    index: "04",
    title: "Security",
    body: "Threat modelling, supply chain, secrets, and the audit trail your regulator asks for — designed in, not bolted on afterwards.",
  },
];

export interface Principle {
  readonly index: string;
  readonly heading: string;
  readonly body: string;
}

export const principles: readonly Principle[] = [
  {
    index: "01",
    heading: "The GOAT stopped shipping",
    body: "Every category has a greatest of all time, and every one of them eventually starts defending instead of building. The roadmap turns into a press release. The price goes up. The release notes get shorter. That is the moment the category becomes worth attacking.",
  },
  {
    index: "02",
    heading: "Small beats slow",
    body: "We do not staff engagements with a pyramid. You get the people who write the code, and there are not many of them. A team of four that ships fortnightly will outrun forty people in a governance forum every single time.",
  },
  {
    index: "03",
    heading: "You keep the keys",
    body: "Open standards, your cloud account, your repositories, your data. Everything we build can be taken over by your own engineers, because the day you no longer need us is the day we did the job properly.",
  },
];

export interface Person {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly image: string;
}

export const team: readonly Person[] = [
  {
    name: "Kseniya Spencer",
    role: "Managing Director",
    bio: "LLB and LPC at Anglia Ruskin and the Oxford Institute of Legal Practice, qualified as a solicitor in 2015, then decided contracts were not enough of a challenge. Runs the business so the engineers do not have to.",
    image: "/images/kseniya.jpg",
  },
  {
    name: "Allan Degnan",
    role: "Principal Engineer",
    bio: "Fifteen-odd years across government, finance, hosting, e-commerce and startups. Has built the platform, been on the pager for it, and passed the audit on it — usually in that order.",
    image: "/images/allan.png",
  },
];

/** Incumbent boilerplate, struck through in the ticker. */
export const platitudes: readonly string[] = [
  "Market leader",
  "Industry standard",
  "Enterprise grade",
  "Nobody got fired for buying us",
  "Talk to sales for pricing",
  "18 month implementation",
  "Certified partner network",
  "Best of breed",
  "Digital transformation journey",
  "Request a quote",
];
