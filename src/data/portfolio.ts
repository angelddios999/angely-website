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
  /** Primary image — thumbnail, lightbox, and the cartoon side of a pair. */
  key: string;
  /** Source photo when this piece is a photo + cartoon pair. */
  pairKey?: string;
  category: string;
  year?: number;
  featured?: boolean;
  placeholder?: boolean;
  /** Hue (0–360) used for the placeholder gradient */
  placeholderHue?: number;
};

export type Story = {
  id: string;
  title: string;
  description?: string;
  coverKey: string;
  /** Page image keys in reading order (1…n). */
  pageKeys: string[];
  year?: number;
  featured?: boolean;
};

export type Animation = {
  id: string;
  title: string;
  description?: string;
  videoKey: string;
  posterKey?: string;
  year?: number;
  featured?: boolean;
  placeholder?: boolean;
  placeholderHue?: number;
};

export const physicalArt: Artwork[] = [
  {
    id: "mi-tata-de-acuarela",
    title: "Mi Tata de Acuarela",
    description: "Painting of my grandmother in watercolor style.",
    key: "physical/2026-mi-tata-de-acuarela.png",
    category: "Painting",
    year: 2026,
    featured: true,
    placeholder: false,
  },
  {
    id: "mi-tata-de-chocolate",
    title: "Mi Tata de Chocolate",
    description: "Drawing of my grandmother in pencil style.",
    key: "physical/2026-mi-tata-de-chocolate.png",
    category: "Drawing",
    year: 2026,
    featured: true,
    placeholder: false,
  },
  {
    id: "mi-tata-de-colores",
    title: "Mi Tata de Colores",
    description: "Drawing of my grandmother in chalk pastel style.",
    key: "physical/2026-mi-tata-de-colores.png",
    category: "Painting",
    year: 2026,
    featured: false,
    placeholder: false,
  },
  {
    id: "mi-tata-de-mandala",
    title: "Mi Tata de Mandala",
    description: "Drawing of my grandmother in a mandala style.",
    key: "physical/2026-mi-tata-de-mandala.png",
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
    id: "cats-1",
    title: "Cats 1",
    key: "physical/2026-cats-1.jpg",
    category: "Sculpture",
    year: 2026,
    placeholder: false,
  },
  {
    id: "chikawa-1",
    title: "Chiikawa 1",
    key: "physical/2026-chikawa-1.jpg",
    category: "Sculpture",
    year: 2026,
    placeholder: false,
  },
  {
    id: "oreo",
    title: "Oreo",
    description: "Drawing of my cat Oreo in pencil style.",
    key: "physical/2025-oreo.png",
    category: "Drawing",
    year: 2025,
    featured: true,
    placeholder: false,
  },
  {
    id: "flying-bird",
    title: "Flying Bird",
    description: "Canvas painting of a bird in watercolor style.",
    key: "physical/2025-flying-bird.png",
    category: "Painting",
    year: 2025,
    featured: false,
    placeholder: false,
  },
  {
    id: "ranma-1",
    title: "Ranma 1",
    key: "physical/2025-ranma-1.jpg",
    category: "Sculpture",
    year: 2025,
    placeholder: false,
  },
  {
    id: "ranma-2",
    title: "Ranma 2",
    key: "physical/2025-ranma-2.jpg",
    category: "Sculpture",
    year: 2025,
    placeholder: false,
  },
  {
    id: "ranma-3",
    title: "Ranma 3",
    key: "physical/2025-ranma-3.jpg",
    category: "Sculpture",
    year: 2025,
    placeholder: false,
  },
  {
    id: "tree-tops",
    title: "Tree Tops",
    description: "Canvas painting of trees in watercolor style.",
    key: "physical/2024-tree-tops.png",
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
    id: "chinese-cat",
    title: "Chinese Cat",
    description: "Canvas painting of a Chinese cat in watercolor style.",
    key: "physical/2024-chinese-cat.png",
    category: "Painting",
    year: 2024,
    featured: false,
    placeholder: false,
  },
  {
    id: "cat-looking-back",
    title: "Cat Looking Back",
    description: "Canvas painting of a cat looking back in watercolor style.",
    key: "physical/2024-cat-looking-back.jpeg",
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
    id: "baby-bills-1",
    title: "Baby Bills 1",
    key: "physical/2024-baby-bills-1.jpg",
    category: "Sculpture",
    year: 2024,
    placeholder: false,
  },
  {
    id: "baby-bills-2",
    title: "Baby Bills 2",
    key: "physical/2024-baby-bills-2.jpg",
    category: "Sculpture",
    year: 2024,
    placeholder: false,
  },
  {
    id: "hada-pencil",
    title: "Hada Pencil",
    key: "physical/2024-hada-pencil.png",
    category: "Sculpture",
    year: 2024,
    placeholder: false,
  },
  {
    id: "murder-drones-1",
    title: "Murder Drones 1",
    key: "physical/2024-murder-drones-1.jpg",
    category: "Sculpture",
    year: 2024,
    placeholder: false,
  },
  {
    id: "murder-drones-2",
    title: "Murder Drones 2",
    key: "physical/2024-murder-drones-2.jpg",
    category: "Sculpture",
    year: 2024,
    placeholder: false,
  },
  {
    id: "murder-drones-3",
    title: "Murder Drones 3",
    key: "physical/2024-murder-drones-3.jpg",
    category: "Sculpture",
    year: 2024,
    placeholder: false,
  },
  {
    id: "tcoal-1",
    title: "TCOAL 1",
    key: "physical/2024-tcoal-1.jpg",
    category: "Sculpture",
    year: 2024,
    placeholder: false,
  },
  {
    id: "still-art",
    title: "Still Art",
    description: "Canvas painting of still art in watercolor style.",
    key: "physical/2023-still-art.png",
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
    id: "chinese-cat-2",
    title: "Chinese Cat 2",
    description: "Canvas painting of a Chinese cat in watercolor style.",
    key: "physical/2022-chinese-cat-2.png",
    category: "Painting",
    year: 2022,
    featured: false,
    placeholder: false,
  },
  {
    id: "arctic-cats",
    title: "Arctic Cats",
    description: "Canvas painting of arctic cats in watercolor style.",
    key: "physical/2022-arctic-cats.png",
    category: "Painting",
    year: 2022,
    featured: false,
    placeholder: false,
  },
];

function cartoonPair(opts: {
  id: string;
  title: string;
  slug: string;
  year: number;
  featured?: boolean;
}): Artwork {
  return {
    id: opts.id,
    title: opts.title,
    key: `digital/cartoons/${opts.slug}/cartoon.png`,
    pairKey: `digital/cartoons/${opts.slug}/photo.png`,
    category: "Cartoons",
    year: opts.year,
    featured: opts.featured,
    placeholder: false,
  };
}

function cartoonStill(opts: {
  id: string;
  title: string;
  file: string;
  year: number;
  featured?: boolean;
}): Artwork {
  return {
    id: opts.id,
    title: opts.title,
    key: `digital/cartoons/${opts.file}`,
    category: "Cartoons",
    year: opts.year,
    featured: opts.featured,
    placeholder: false,
  };
}

export const digitalArt: Artwork[] = [
  cartoonStill({
    id: "hades-stretching",
    title: "Hades Stretching",
    file: "2026-hades-stretching.png",
    year: 2026,
    featured: true,
  }),
  cartoonStill({
    id: "hades-sniffing",
    title: "Hades Sniffing",
    file: "2026-hades-sniffing.png",
    year: 2026,
  }),
  cartoonStill({
    id: "hades-fat",
    title: "Hades Fat",
    file: "2026-hades-fat.png",
    year: 2026,
  }),
  cartoonStill({
    id: "hades-chud",
    title: "Hades Chud",
    file: "2026-hades-chud.png",
    year: 2026,
  }),
  cartoonStill({
    id: "hada-worm",
    title: "Hada Worm",
    file: "2026-hada-worm.png",
    year: 2026,
  }),
  cartoonStill({
    id: "hada-sneezing",
    title: "Hada Sneezing",
    file: "2026-hada-sneezing.png",
    year: 2026,
    featured: true,
  }),
  cartoonStill({
    id: "hada-chud",
    title: "Hada Chud",
    file: "2026-hada-chud.png",
    year: 2026,
  }),
  cartoonStill({
    id: "oreo-in-awe",
    title: "Oreo in Awe",
    file: "2025-oreo-in-awe.png",
    year: 2025,
    featured: true,
  }),
  cartoonStill({
    id: "hades-silly",
    title: "Silly Hades",
    file: "2025-hades-silly.png",
    year: 2025,
  }),
  cartoonStill({
    id: "hada-opossum",
    title: "Hada Opossum",
    file: "2025-hada-opossum.png",
    year: 2025,
  }),
  cartoonPair({
    id: "oreo-portrait",
    title: "Oreo",
    slug: "2024-oreo",
    year: 2024,
    featured: true,
  }),
  cartoonPair({
    id: "hades-portrait",
    title: "Hades",
    slug: "2024-hades",
    year: 2024,
  }),
  cartoonPair({
    id: "hades-hada-fight",
    title: "Hades & Hada Fight",
    slug: "2024-hades-hada-fight",
    year: 2024,
    featured: true,
  }),
  cartoonPair({
    id: "cats-portrait",
    title: "Cats",
    slug: "2024-cats",
    year: 2024,
  }),
];

export const stories: Story[] = [
  {
    id: "manipulation",
    title: "Manipulation",
    coverKey: "stories/manipulation/cover.png",
    pageKeys: Array.from({ length: 13 }, (_, i) => `stories/manipulation/${i + 1}.png`),
    featured: true,
  },
];

export const animations: Animation[] = [
  {
    id: "finding-sun",
    title: "Finding Sun",
    description: "Sno-Isle Summer Animation 2026 - First Place Winner",
    videoKey: "animation/2026-finding-sun.mp4",
    posterKey: "animation/2026-finding-sun.png",
    year: 2026,
    placeholder: false,
  },
  {
    id: "breakthrough-junior-challenge",
    title: "Breakthrough Junior Challenge",
    videoKey: "animation/2026-breakthrough-junior-challenge.mp4",
    year: 2026,
    placeholder: false,
  },
  {
    id: "information-literacy",
    title: "Information Literacy",
    videoKey: "animation/2026-information-literacy.mov",
    year: 2026,
    placeholder: false,
  },
  {
    id: "lift-off",
    title: "Lift Off",
    description: "Sno-Isle Summer Animation 2025 - First Place Winner",
    videoKey: "animation/2025-lift-off.mp4",
    posterKey: "animation/2025-lift-off.png",
    year: 2025,
    placeholder: false,
  },
  {
    id: "orbit",
    title: "Orbit",
    description: "Sno-Isle Summer Animation 2024 - Second Place Winner",
    videoKey: "animation/2024-orbit.mp4",
    posterKey: "animation/2024-orbit.png",
    year: 2024,
    placeholder: false,
  },
];

/** Gallery path for an artwork based on its R2 key prefix */
export function galleryHrefFor(item: Artwork): string {
  if (item.key.startsWith("digital/")) return "/digital";
  return "/physical";
}

export function storyHref(story: Story): string {
  return `/stories/${story.id}`;
}

/** Featured pieces for the home page */
export function getFeatured() {
  const art = [...physicalArt, ...digitalArt].filter((a) => a.featured);
  const anim = animations.filter((a) => a.featured);
  const story = stories.filter((s) => s.featured);
  return { art, anim, story };
}

export function categoriesOf(items: Artwork[]): string[] {
  return [...new Set(items.map((i) => i.category))];
}

export function isPair(item: Artwork): boolean {
  return Boolean(item.pairKey);
}
