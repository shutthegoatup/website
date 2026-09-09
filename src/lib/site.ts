export const site = {
  name: "Shut The Goat Up",
  shortName: "STGU",
  domain: "shutthegoatup.com",
  url: "https://shutthegoatup.com",
  email: "fight@shutthegoatup.com",
  tagline: "Every category has a GOAT. We come for it.",
  /** Plain-language descriptor for the home <title>; the tagline says nothing searchable. */
  proposition: "Product engineering",
  description:
    "Shut The Goat Up is a product engineering company from London. We build software that takes on the incumbents — real-time 3D, payments, and the platforms underneath them.",
  /** Where we are. The registered office is elsewhere — see `address`. */
  city: "London",
  founded: "2022",
  legalEntity: "Shut The Goat Up Ltd",
  companyNumber: "14408578",
  jurisdiction: "Registered in England and Wales",
  address: "The Old Surgery, Doctors Road, Blofield, Norwich, NR13\u00A04LF",
  social: {
    linkedin: "https://www.linkedin.com/company/shutthegoatup",
    github: "https://github.com/shutthegoatup",
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
    category: "Review app & configurator",
    blurb:
      "Photoreal, interactive 3D streamed to any browser — no plugin, no workstation, no download. Send a link, take comments straight on the model, and let people configure the thing themselves.",
    takes: "Frame.io and Sketchfab",
    href: "https://renderapp.io",
  },
  {
    name: "Tender",
    status: "building",
    category: "Point of sale",
    blurb:
      "A multi-tenant point-of-sale platform: merchant API, dashboard and terminal app. Built for operators who resent paying a percentage of their business for a card reader.",
    takes: "Square and Toast",
    href: null,
  },
  {
    name: "Gruff",
    status: "classified",
    category: "Security",
    blurb:
      "Not announced. Not a landing page with a waitlist. It ships when it is good enough to embarrass something expensive.",
    takes: "Long-lived credentials",
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
    body: "Senior people writing the actual software. Small teams, short cycles, and something running every week rather than a roadmap slide.",
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
    body: "Threat modelling, supply chain, secrets, and an audit trail that survives contact with a regulator — designed in, not bolted on afterwards.",
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
    body: "We do not build with a pyramid. The people who design the product write the code, and there are not many of them. A team of four shipping fortnightly will outrun forty people in a governance forum every single time.",
  },
  {
    index: "03",
    heading: "No lock-in",
    body: "Open standards, open formats, and software you can run yourself. Your data exports, and your deployment is yours to keep. We would rather earn the renewal than rely on how painful it would be to leave.",
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
    role: "Technical Director",
    bio: "Twenty years across government, defence, finance, media and startups. CTO when it needed one, and still the one writing the code. Has built the platform, been on the pager for it, and passed the audit on it — usually in that order.",
    image: "/images/allan.png",
  },
];

/**
 * Closed vocabulary for writing tags. The first four match the disciplines in
 * `capabilities`, so a piece points back at the work it came out of. Adding a
 * tag means adding it here — anything else fails the build.
 */
export const writingTags = [
  "Product engineering",
  "Platform engineering",
  "Reliability",
  "Security",
  "Hiring",
  "Leadership",
  "Culture",
] as const;

export type WritingTag = (typeof writingTags)[number];

/**
 * What kind of piece it is, and a plain gloss shown on the page. Sarcasm does
 * not survive being read cold by someone who does not know us, and half of
 * these argue the opposite of what they say.
 */
export const writingKinds = {
  "War story": "First hand, from inside the incident. All of it happened.",
  Satire: "Played for the joke — it argues the opposite of what it means.",
  Argument: "A position, straight. No wink, no irony.",
  Analysis: "A breakdown of someone else's failure and what it teaches.",
  Playbook: "How we actually do it, rather than how it looks in a deck.",
} as const;

export type WritingKind = keyof typeof writingKinds;

/** Writing index. Articles themselves live in `src/content/writing`. */
export const writingPage = {
  eyebrow: "Writing — the long version",
  heading: "Show your",
  headingAccent: "working",
  intro:
    "Outages, post-mortems and the occasional argument. Written by the people who were on the pager for it, not by a content team.",
  empty: "Nothing published here yet.",
} as const;

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
