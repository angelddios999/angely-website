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
  key: string;
  category: string;
  year?: number;
  featured?: boolean;
  placeholder?: boolean;
  /** Hue (0–360) used for the placeholder gradient */
  placeholderHue?: number;
};

export type Animation = {
  id: string;
  title: string;
  description?: string;
  videoKey: string;
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

/**
 * Cartoonish digital drawings of people and animals Angely loves to draw.
 * Upload to R2 under keys like cartoons/friend-portrait.jpg.
 */
export const cartoons: Artwork[] = [
  {
    id: "cart-1",
    title: "Best Friend Portrait",
    description: "TODO: replace — cartoonish digital portrait of a person Angely loves to draw.",
    key: "cartoons/best-friend-portrait.jpg",
    category: "People",
    year: 2025,
    featured: true,
    placeholder: true,
    placeholderHue: 340,
  },
  {
    id: "cart-2",
    title: "Neighborhood Cat",
    description: "TODO: replace — playful cartoon of a beloved animal.",
    key: "cartoons/neighborhood-cat.jpg",
    category: "Animals",
    year: 2025,
    featured: true,
    placeholder: true,
    placeholderHue: 30,
  },
  {
    id: "cart-3",
    title: "Sibling Sketch",
    description: "TODO: replace — stylized digital cartoon of family.",
    key: "cartoons/sibling-sketch.jpg",
    category: "People",
    year: 2024,
    placeholder: true,
    placeholderHue: 200,
  },
  {
    id: "cart-4",
    title: "Pup Portrait",
    description: "TODO: replace — cartoon dog with big personality.",
    key: "cartoons/pup-portrait.jpg",
    category: "Animals",
    year: 2025,
    featured: true,
    placeholder: true,
    placeholderHue: 45,
  },
  {
    id: "cart-5",
    title: "Classroom Crew",
    description: "TODO: replace — group cartoon of friends or classmates.",
    key: "cartoons/classroom-crew.jpg",
    category: "People",
    year: 2024,
    placeholder: true,
    placeholderHue: 280,
  },
  {
    id: "cart-6",
    title: "Backyard Bird",
    description: "TODO: replace — cute cartoon bird study.",
    key: "cartoons/backyard-bird.jpg",
    category: "Animals",
    year: 2025,
    placeholder: true,
    placeholderHue: 160,
  },
];

export const animations: Animation[] = [
  {
    id: "finding_sun",
    title: "Finding Sun",
    description: "Sno-Isle Summer Animation 2026 - First Place Winner",
    videoKey: "animation/2026-finding_sun.mp4",
    posterKey: "animation/2026-finding_sun.png",
    year: 2026,
    featured: true,
    placeholder: false,
    placeholderHue: 265,
  },
  {
    id: "lift_off",
    title: "Lift Off",
    description: "Sno-Isle Summer Animation 2025 - First Place Winner",
    videoKey: "animation/2025-lift_off.mp4",
    posterKey: "animation/2025-lift_off.png",
    year: 2025,
    featured: true,
    placeholder: false,
    placeholderHue: 200,
  },
  {
    id: "orbit",
    title: "Orbit",
    description: "Sno-Isle Summer Animation 2024 - Second Place Winner",
    videoKey: "animation/2024-orbit.mp4",
    posterKey: "animation/2024-orbit.png",
    year: 2024,
    featured: true,
    placeholder: false,
    placeholderHue: 15,
  },
];

/** Gallery path for an artwork based on its R2 key prefix */
export function galleryHrefFor(item: Artwork): string {
  if (item.key.startsWith("digital/")) return "/digital";
  if (item.key.startsWith("cartoons/")) return "/cartoons";
  return "/physical";
}

/** Featured pieces for the home page */
export function getFeatured() {
  const art = [...physicalArt, ...digitalArt, ...cartoons].filter((a) => a.featured);
  const anim = animations.filter((a) => a.featured);
  return { art, anim };
}

export function categoriesOf(items: Artwork[]): string[] {
  return [...new Set(items.map((i) => i.category))];
}
