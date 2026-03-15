export interface FundingRound {
  round: string;
  amount: string;
  date: string;
  lead: string;
}

export interface Company {
  slug: string;
  name: string;
  logo: string;
  sector: string;
  stage: string;
  founded: number;
  hq: string;
  founders: string[];
  description: string;
  funding_history: FundingRound[];
  key_metrics: {
    employees: string;
    revenue_range: string;
    growth: string;
  };
  competitors: string[];
  m13_relationship: string;
  recent_milestones: string[];
  website: string;
}

export const companies: Company[] = [
  {
    slug: "lyft",
    name: "Lyft",
    logo: "/logos/lyft.svg",
    sector: "Mobility / Transportation",
    stage: "Public (NASDAQ: LYFT)",
    founded: 2012,
    hq: "San Francisco, CA",
    founders: ["Logan Green", "John Zimmer"],
    description:
      "On-demand transportation platform connecting riders with drivers across North America.",
    funding_history: [
      { round: "Seed", amount: "$0.5M", date: "2010-09", lead: "Sean Aggarwal" },
      { round: "Series A", amount: "$6M", date: "2013-05", lead: "Mayfield Fund" },
      { round: "Series B", amount: "$60M", date: "2014-04", lead: "Andreessen Horowitz" },
      { round: "Series C", amount: "$250M", date: "2015-03", lead: "Rakuten" },
      { round: "Series G", amount: "$600M", date: "2018-06", lead: "Fidelity" },
      { round: "IPO", amount: "$2.3B", date: "2019-03", lead: "Public Offering" },
    ],
    key_metrics: {
      employees: "4,000+",
      revenue_range: "$4.4B (2024 Revenue)",
      growth: "17% YoY Revenue Growth",
    },
    competitors: ["Uber", "Waymo", "Via Transportation"],
    m13_relationship: "Early-stage investor via fund; portfolio synergy partner for mobility thesis",
    recent_milestones: [
      "Achieved GAAP profitability for first time in Q4 2024",
      "Launched autonomous vehicle partnerships with Motional and May Mobility",
      "Expanded media network ad business generating $200M+ revenue",
      "Introduced 'Price Lock' subscription feature with 1M+ subscribers",
    ],
    website: "https://www.lyft.com",
  },
  {
    slug: "pinterest",
    name: "Pinterest",
    logo: "/logos/pinterest.svg",
    sector: "Commerce / Social Discovery",
    stage: "Public (NYSE: PINS)",
    founded: 2010,
    hq: "San Francisco, CA",
    founders: ["Ben Silbermann", "Paul Sciarra", "Evan Sharp"],
    description:
      "Visual discovery engine helping people find inspiration and shop products through curated image boards.",
    funding_history: [
      { round: "Seed", amount: "$0.5M", date: "2010-03", lead: "FirstMark Capital" },
      { round: "Series A", amount: "$10M", date: "2011-10", lead: "Bessemer Venture Partners" },
      { round: "Series D", amount: "$200M", date: "2014-05", lead: "SV Angel" },
      { round: "Series G", amount: "$150M", date: "2017-06", lead: "Valiant Capital" },
      { round: "IPO", amount: "$1.4B", date: "2019-04", lead: "Public Offering" },
    ],
    key_metrics: {
      employees: "5,500+",
      revenue_range: "$3.6B (2024 Revenue)",
      growth: "18% YoY Revenue Growth",
    },
    competitors: ["Instagram", "TikTok Shop", "Google Shopping"],
    m13_relationship: "Growth-stage investor; strategic advisory on commerce integrations",
    recent_milestones: [
      "AI-powered 'Shuffles' collage app surpassed 20M downloads",
      "Launched third-party ad partnerships with Amazon and Google",
      "Shoppable Pins conversion rates improved 40% via ML personalization",
      "International revenue grew 28% YoY, led by EU and LATAM markets",
    ],
    website: "https://www.pinterest.com",
  },
  {
    slug: "ring",
    name: "Ring",
    logo: "/logos/ring.svg",
    sector: "IoT / Smart Home Security",
    stage: "Acquired by Amazon (2018, $1.2B)",
    founded: 2013,
    hq: "Santa Monica, CA",
    founders: ["Jamie Siminoff"],
    description:
      "Home security and smart home platform offering video doorbells, cameras, and alarm systems.",
    funding_history: [
      { round: "Seed", amount: "$0.2M", date: "2013-01", lead: "Self-funded" },
      { round: "Series A", amount: "$5M", date: "2014-10", lead: "Kleiner Perkins" },
      { round: "Series B", amount: "$28M", date: "2016-04", lead: "Goldman Sachs" },
      { round: "Series C", amount: "$109M", date: "2017-03", lead: "DFJ Growth" },
      { round: "Acquisition", amount: "$1.2B", date: "2018-02", lead: "Amazon" },
    ],
    key_metrics: {
      employees: "2,000+ (within Amazon)",
      revenue_range: "Est. $1.8B (division revenue)",
      growth: "15% unit growth YoY",
    },
    competitors: ["Google Nest", "Arlo", "SimpliSafe"],
    m13_relationship: "Pre-acquisition investor; case study in M13's consumer IoT thesis and successful exit",
    recent_milestones: [
      "Launched Ring Car Camera expanding beyond home security",
      "Introduced end-to-end encryption for all video products",
      "Ring Alarm Pro integrated with Eero mesh router for unified home network",
      "Expanded to 8 international markets including Japan and Australia",
    ],
    website: "https://ring.com",
  },
  {
    slug: "rho",
    name: "Rho",
    logo: "/logos/rho.svg",
    sector: "Fintech / B2B Finance",
    stage: "Series C",
    founded: 2018,
    hq: "New York, NY",
    founders: ["Everett Cook", "Alex Wheldon"],
    description:
      "All-in-one corporate finance platform offering banking, cards, AP/AR automation, and expense management for mid-market businesses.",
    funding_history: [
      { round: "Seed", amount: "$4.5M", date: "2018-06", lead: "M13" },
      { round: "Series A", amount: "$15M", date: "2020-03", lead: "Torch Capital" },
      { round: "Series B", amount: "$75M", date: "2022-01", lead: "Dragoneer" },
      { round: "Series C", amount: "$130M", date: "2024-09", lead: "Valor Equity Partners" },
    ],
    key_metrics: {
      employees: "300-400",
      revenue_range: "$40M-$60M ARR",
      growth: "3x YoY Transaction Volume",
    },
    competitors: ["Brex", "Ramp", "Bill.com", "Mercury"],
    m13_relationship: "Seed investor and board observer; active portfolio company with ongoing strategic support",
    recent_milestones: [
      "Raised $130M Series C at $500M+ valuation in Sep 2024",
      "Launched AI-powered AP automation reducing processing time by 80%",
      "Crossed $50B in total processed transaction volume",
      "Won 200+ mid-market enterprise accounts from legacy banking providers",
    ],
    website: "https://www.rho.co",
  },
  {
    slug: "matterport",
    name: "Matterport",
    logo: "/logos/matterport.svg",
    sector: "PropTech / Spatial Computing",
    stage: "Acquired by CoStar Group (2024, $1.6B)",
    founded: 2011,
    hq: "Sunnyvale, CA",
    founders: ["Matt Bell", "Dave Gausebeck"],
    description:
      "Leading spatial data platform creating 3D digital twins of physical spaces for real estate, construction, and facilities management.",
    funding_history: [
      { round: "Series A", amount: "$3.6M", date: "2012-06", lead: "Lux Capital" },
      { round: "Series B", amount: "$16M", date: "2014-07", lead: "Qualcomm Ventures" },
      { round: "Series C", amount: "$30M", date: "2017-03", lead: "Draper Fisher Jurvetson" },
      { round: "SPAC IPO", amount: "$640M", date: "2021-07", lead: "Gores Holdings VI" },
      { round: "Acquisition", amount: "$1.6B", date: "2024-04", lead: "CoStar Group" },
    ],
    key_metrics: {
      employees: "600+ (pre-acquisition)",
      revenue_range: "$160M (2023 Revenue)",
      growth: "22% YoY Subscriber Growth",
    },
    competitors: ["Zillow 3D", "iGuide", "GeoCV"],
    m13_relationship: "Growth-stage investor; strong alignment with M13's proptech and spatial computing thesis",
    recent_milestones: [
      "Acquired by CoStar Group for $1.6B in April 2024",
      "Digital twin library surpassed 12M spaces captured",
      "Launched AI-powered 'Genesis' for automated floor plan generation",
      "Enterprise customers grew 45% including Cushman & Wakefield",
    ],
    website: "https://matterport.com",
  },
  {
    slug: "prepared",
    name: "Prepared",
    logo: "/logos/prepared.svg",
    sector: "GovTech / Public Safety",
    stage: "Series B",
    founded: 2018,
    hq: "New York, NY",
    founders: ["Gabriel Kra"],
    description:
      "AI-powered 911 technology platform that enhances emergency response with real-time translation, transcription, and situational awareness tools.",
    funding_history: [
      { round: "Seed", amount: "$4M", date: "2019-03", lead: "M13" },
      { round: "Series A", amount: "$16M", date: "2021-09", lead: "a]6z" },
      { round: "Series B", amount: "$27M", date: "2023-11", lead: "Andreessen Horowitz" },
    ],
    key_metrics: {
      employees: "80-120",
      revenue_range: "$15M-$25M ARR",
      growth: "2.5x YoY Revenue Growth",
    },
    competitors: ["Zetron", "Carbyne", "RapidSOS"],
    m13_relationship: "Seed investor; deep involvement in go-to-market strategy and public sector partnerships",
    recent_milestones: [
      "Deployed in 500+ 911 centers serving 100M+ Americans",
      "Launched real-time AI translation supporting 150+ languages for 911 calls",
      "Named to Forbes AI 50 list in 2024",
      "Partnered with major county emergency services for predictive dispatch pilot",
    ],
    website: "https://www.prepared911.com",
  },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}
