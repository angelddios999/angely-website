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
    id: "mi_tata_de_acuarela",
    title: "Mi Tata de Acuarela",
    description: "Painting of my grandmother in watercolor style.",
    key: "physical/2026-mi_tata_de_acuarela.png",
    category: "Painting",
    year: 2026,
    featured: true,
    placeholder: false,
  },
  {
    id: "mi_tata_de_chocolate",
    title: "Mi Tata de Chocolate",
    description: "Drawing of my grandmother in pencil style.",
    key: "physical/2026-mi_tata_de_chocolate.png",
    category: "Drawing",
    year: 2026,
    featured: true,
    placeholder: false,
  },
  {
    id: "mi_tata_de_colores",
    title: "Mi Tata de Colores",
    description: "Drawing of my grandmother in chalk pastel style.",
    key: "physical/2026-mi_tata_de_colores.png",
    category: "Painting",
    year: 2026,
    featured: false,
    placeholder: false,
  },
  {
    id: "mi_tata_de_mandala",
    title: "Mi Tata de Mandala",
    description: "Drawing of my grandmother in a mandala style.",
    key: "physical/2026-mi_tata_de_mandala.png",
    category: "Drawing",
    year: 2026,
    featured: false,
    placeholder: false,
  },
  {
    id: "freeway",
    title: "Freeway",
    description: "Freeway landscape in watercolor style.",
    key: "physical/2026-freeway.png",
    category: "Painting",
    year: 2026,
    featured: false,
    placeholder: false,
  },
  {
    id: "bathroom",
    title: "Bathroom",
    description: "Bathroom interior in watercolor style.",
    key: "physical/2026-bathroom.png",
    category: "Painting",
    year: 2026,
    featured: false,
    placeholder: false,
  },
  {
    id: "oreo",
    title: "Oreo",
    description: "Drawing of my cat Oreo in pencil style.",
    key: "physical/2025-oreo.png",
    category: "Drawing",
    year: 2025,
    featured: false,
    placeholder: false,
  },
  {
    id: "flying_bird",
    title: "Flying Bird",
    description: "Canvas painting of a bird in watercolor style.",
    key: "physical/2025-flying_bird.png",
    category: "Painting",
    year: 2025,
    featured: false,
    placeholder: false,
  },
  {
    id: "tree_tops",
    title: "Tree Tops",
    description: "Canvas painting of trees in watercolor style.",
    key: "physical/2024-tree_tops.png",
    category: "Painting",
    year: 2024,
    featured: false,
    placeholder: false,
  },
  {
    id: "milkman",
    title: "Milkman",
    description: "Canvas painting of a milkman in watercolor style.",
    key: "physical/2024-milkman.png",
    category: "Painting",
    year: 2024,
    featured: false,
    placeholder: false,
  },
  {
    id: "cynessa",
    title: "Cynessa",
    description: "Canvas painting of a Cynessa in watercolor style.",
    key: "physical/2024-cynessa.png",
    category: "Painting",
    year: 2024,
    featured: false,
    placeholder: false,
  },
  {
    id: "chinese_cat",
    title: "Chinese Cat",
    description: "Canvas painting of a Chinese cat in watercolor style.",
    key: "physical/2024-chinese_cat.png",
    category: "Painting",
    year: 2024,
    featured: false,
    placeholder: false,
  },
  {
    id: "cat_looking_back",
    title: "Cat Looking Back",
    description: "Canvas painting of a cat looking back in watercolor style.",
    key: "physical/2024-cat_looking_back.jpeg",
    category: "Painting",
    year: 2024,
    featured: true,
    placeholder: false,
  },
  {
    id: "bird",
    title: "Bird",
    description: "Canvas painting of a bird in watercolor style.",
    key: "physical/2024-bird.png",
    category: "Painting",
    year: 2024,
    featured: true,
    placeholder: false,
  },
  {
    id: "still_art",
    title: "Still Art",
    description: "Canvas painting of still art in watercolor style.",
    key: "physical/2023-still_art.png",
    category: "Painting",
    year: 2023,
    featured: true,
    placeholder: false,
  },
  {
    id: "kirara",
    title: "Kirara",
    description: "Canvas painting of Kirara in watercolor style.",
    key: "physical/2023-kirara.png",
    category: "Painting",
    year: 2023,
    featured: false,
    placeholder: false,
  },
  {
    id: "chinese_cat_2",
    title: "Chinese Cat 2",
    description: "Canvas painting of a Chinese cat in watercolor style.",
    key: "physical/2022-chinese_cat_2.png",
    category: "Painting",
    year: 2022,
    featured: false,
    placeholder: false,
  },
  {
    id: "arctic_cats",
    title: "Arctic Cats",
    description: "Canvas painting of arctic cats in watercolor style.",
    key: "physical/2022-arctic_cats.png",
    category: "Painting",
    year: 2022,
    featured: false,
    placeholder: false,
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
