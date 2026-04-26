/**
 * Curated flagship case studies — used on Home and Portfolio.
 */
export const FEATURED_CASE_STUDIES = [
  {
    title: "Turnox",
    kicker: "SaaS · booking",
    problem:
      "Service businesses need reliable scheduling without a heavy enterprise stack. The product had to feel instant on mobile and stay operable on flaky networks.",
    solution:
      "A focused client-and-admin flow for appointments, with a frontend tuned for quick first paint and predictable state after navigation.",
    architecture:
      "Separation of public booking and authenticated views, with shared design primitives so UX stays consistent as features ship.",
    tradeoffs:
      "Favored convention and speed of iteration over a maximal component library, while keeping routes and data boundaries clear for future growth.",
    outcomes:
      "Operators onboard in minutes. The surface area stays small on purpose, which keeps maintenance cost predictable as usage scales.",
    link: "https://www.turnox.online/",
    linkLabel: "Visit Turnox (opens in a new tab)",
    image: "https://i.ibb.co/m5qgvQPd/Screenshot-2026-04-20-at-13-10-08.png",
  },
  {
    title: "Wanna Work",
    kicker: "Productivity · documents",
    problem:
      "Resume builders often ship generic templates; users need confidence that what they see is what recruiters see, and fast time-to-export.",
    solution:
      "Template system with a strong default visual hierarchy, optimized asset loading so the editor remains responsive on average hardware.",
    architecture:
      "Content and presentation are structured so new templates do not require forked logic; export paths stay stable as layouts evolve.",
    tradeoffs:
      "Chose a thinner animation layer in favor of consistent layout and print-friendly output, which is where the product’s credibility lives.",
    outcomes:
      "Users can go from sign-up to a presentable document quickly, with fewer support edge cases from layout breakage across viewports.",
    link: "https://wannawork.xyz/",
    linkLabel: "Visit Wanna Work (opens in a new tab)",
    image: "https://i.ibb.co/KGp0cGd/wanna-work-page.png",
  },
  {
    title: "Blabi",
    kicker: "Platform · no-code web",
    problem:
      "Non-technical users need a site that feels custom without a full agency engagement. Page weight and clarity matter as much as templates.",
    solution:
      "A generator-led experience that keeps pages lean and enforces a coherent structure so sites stay performant and accessible by default.",
    architecture:
      "Treating pages as composable blocks with shared head metadata patterns, so SEO and social previews stay correct as users iterate.",
    tradeoffs:
      "Narrower layout freedom than a raw CMS, in exchange for fewer performance cliffs and a more supportable long tail of customers.",
    outcomes:
      "Faster paths from idea to published site, with frontends that remain easy to reason about as the product adds vertical-specific flows.",
    link: "https://blabi.com.ar/",
    linkLabel: "Visit Blabi (opens in a new tab)",
    image: "https://i.ibb.co/mXYD7cX/blabi.webp",
  },
] as const;

export type CaseStudy = (typeof FEATURED_CASE_STUDIES)[number];
