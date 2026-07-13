/**
 * Portfolio content catalog.
 *
 * Photos and videos live in Cloudflare R2 (MEDIA_BUCKET), not in git.
 * Each entry's `key` / `videoKey` / `posterKey` is the R2 object key.
 * The site renders them as `/media/<key>` at build/request time.
 *
 * Workflow to add real media:
 *   1. Upload the file to R2 under the same key (e.g. physical/charcoal-01.jpg)
 *   2. Set `placeholder: false` (or remove the field)
 *   3. Redeploy or refresh — no code changes needed
 *
 * TODO: replace all placeholder entries with real titles, keys, and copy.
 */

export type Artwork = {
  id: string;
  title: string;
  description?: string;
  /** R2 object key for the image */
  key: string;
  category: string;
  year?: number;
  featured?: boolean;
  /** When true, show a styled stand-in instead of loading from R2 */
  placeholder?: boolean;
  /** Hue (0–360) used for the placeholder gradient */
  placeholderHue?: number;
};

export type Animation = {
  id: string;
  title: string;
  description?: string;
  /** R2 object key for the video file */
  videoKey: string;
  /** R2 object key for the poster thumbnail */
  posterKey: string;
  year?: number;
  featured?: boolean;
  placeholder?: boolean;
  placeholderHue?: number;
};

export const physicalArt: Artwork[] = [
  {
    id: "phys-1",
    title: "Charcoal Portrait Study",
    description: "TODO: replace — graphite and charcoal on toned paper.",
    key: "physical/charcoal-portrait-study.jpg",
    category: "Drawing",
    year: 2025,
    featured: true,
    placeholder: true,
    placeholderHue: 25,
  },
  {
    id: "phys-2",
    title: "Watercolor Skies",
    description: "TODO: replace — loose washes exploring light and weather.",
    key: "physical/watercolor-skies.jpg",
    category: "Painting",
    year: 2025,
    featured: true,
    placeholder: true,
    placeholderHue: 210,
  },
  {
    id: "phys-3",
    title: "Ink Botanical",
    description: "TODO: replace — fine-line ink study of local plants.",
    key: "physical/ink-botanical.jpg",
    category: "Ink",
    year: 2024,
    placeholder: true,
    placeholderHue: 140,
  },
  {
    id: "phys-4",
    title: "Figure Gesture Set",
    description: "TODO: replace — timed gesture drawings from life session.",
    key: "physical/figure-gesture.jpg",
    category: "Drawing",
    year: 2025,
    placeholder: true,
    placeholderHue: 5,
  },
  {
    id: "phys-5",
    title: "Pastel Landscape",
    description: "TODO: replace — soft pastel evening fields.",
    key: "physical/pastel-landscape.jpg",
    category: "Painting",
    year: 2024,
    featured: true,
    placeholder: true,
    placeholderHue: 45,
  },
  {
    id: "phys-6",
    title: "Mixed Media Collage",
    description: "TODO: replace — paper, ink, and found textures.",
    key: "physical/mixed-media-collage.jpg",
    category: "Mixed Media",
    year: 2025,
    placeholder: true,
    placeholderHue: 320,
  },
];

export const digitalArt: Artwork[] = [
  {
    id: "dig-1",
    title: "Character Concept — Mira",
    description: "TODO: replace — character design exploration.",
    key: "digital/character-mira.jpg",
    category: "Character Design",
    year: 2025,
    featured: true,
    placeholder: true,
  },
  {
    id: "dig-2",
    title: "Environment Sketch — Harbor",
    description: "TODO: replace — painted digital environment.",
    key: "digital/env-harbor.jpg",
    category: "Environment",
    year: 2025,
    featured: true,
    placeholder: true,
  },
  {
    id: "dig-3",
    title: "Illustration — Quiet Morning",
    description: "TODO: replace — storybook-style digital illustration.",
    key: "digital/quiet-morning.jpg",
    category: "Illustration",
    year: 2024,
    placeholder: true,
    placeholderHue: 35,
  },
  {
    id: "dig-4",
    title: "UI Mood Board Frames",
    description: "TODO: replace — color and composition studies.",
    key: "digital/ui-mood.jpg",
    category: "Concept",
    year: 2025,
    placeholder: true,
    placeholderHue: 250,
  },
  {
    id: "dig-5",
    title: "Creature Sheet",
    description: "TODO: replace — creature design turnarounds.",
    key: "digital/creature-sheet.jpg",
    category: "Character Design",
    year: 2024,
    featured: true,
    placeholder: true,
    placeholderHue: 160,
  },
  {
    id: "dig-6",
    title: "Poster Experiment",
    description: "TODO: replace — typography and composition play.",
    key: "digital/poster-experiment.jpg",
    category: "Illustration",
    year: 2025,
    placeholder: true,
    placeholderHue: 350,
  },
];

export const animations: Animation[] = [
  {
    id: "lift_off",
    title: "Lift Off",
    description: "Final project for the Sno-Isle Summer Animation 2005",
    videoKey: "animation/lift_off.mp4",
    posterKey: "animation/lift_off.png",
    year: 2025,
    featured: true,
    placeholder: false,
    placeholderHue: 200,
  },
  {
    id: "orbit",
    title: "Orbit",
    description: "Final project for the Sno-Isle Summer Animation 2004",
    videoKey: "animation/orbit.mp4",
    posterKey: "animation/orbit.png",
    year: 2024,
    featured: true,
    placeholder: false,
    placeholderHue: 15,
  },
  {
    id: "anim-3",
    title: "Title Card Loop",
    description: "TODO: replace — looping intro title animation.",
    videoKey: "animations/title-card.mp4",
    posterKey: "animations/title-card-poster.jpg",
    year: 2025,
    featured: true,
    placeholder: true,
    placeholderHue: 265,
  },
];

export const about = {
  // TODO: replace all bio copy
  headline: "Making pictures move — and stand still.",
  lead: "TODO: replace — short intro about who Angely is and what she makes.",
  body: [
    "TODO: replace — longer bio paragraph. Talk about media (pencil, paint, digital, animation), influences, and what this portfolio collects.",
    "TODO: replace — another paragraph on process, school/work, or goals. Keep it warm and personal.",
  ],
  highlights: [
    { label: "Focus", value: "Drawing · Digital Art · Animation" },
    { label: "Based in", value: "Seattle WA" },
    { label: "Available for", value: "Commissions / Collabs / School Projects" },
  ],
};

/** Featured pieces for the home page */
export function getFeatured() {
  const art = [...physicalArt, ...digitalArt].filter((a) => a.featured);
  const anim = animations.filter((a) => a.featured);
  return { art, anim };
}

export function categoriesOf(items: Artwork[]): string[] {
  return [...new Set(items.map((i) => i.category))];
}
