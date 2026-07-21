/**
 * Site-wide copy and metadata.
 * TODO: replace placeholder bio/contact details with real content.
 */
export const site = {
  /** First name only — "More about Angely", browser title suffixes, etc. */
  shortName: "Angely",
  /** Legal / formal name — footer, copyright, page titles. */
  fullName: "Angely De Dios",
  title: "Angely De Dios — Art & Animation Portfolio",
  description:
    "A portfolio of physical drawings, digital art, cartoons, and short animations.",
  url: "https://angelydedios.com",
  nav: [
    { href: "/", label: "Home" },
    { href: "/physical", label: "Physical Art" },
    { href: "/digital", label: "Digital Art" },
    { href: "/cartoons", label: "Cartoons" },
    { href: "/animations", label: "Animations" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  social: [
    // TODO: replace with real profile URLs or remove
    { label: "Instagram", href: "https://www.instagram.com/angely_a12" },
    { label: "YouTube", href: "https://www.youtube.com/@angely_a12" },
  ],
  contact: {
    // Display-only email on the contact page (form still goes through Resend)
    email: "contact@angelydedios.com",
  },
  /** Legal note shown in the site footer */
  footerDisclaimer:
    "Character designs referenced in some artwork on this site belong to their original creators and are used here for personal, non-commercial portfolio purposes only. No affiliation with or endorsement by the original rights holders is claimed or implied.",
  /**
   * About-page bio, portrait, and at-a-glance facts.
   * Not portfolio catalog — lives here with other site identity copy.
   * TODO: replace all bio copy and portrait media.
   */
  about: {
    headline: "Making pictures move — and stand still.",
    lead: "TODO: replace — short intro about who Angely is and what she makes.",
    body: [
      "TODO: replace — longer bio paragraph. Talk about media (pencil, paint, digital, cartoons, animation), influences, and what this portfolio collects.",
      "TODO: replace — another paragraph on process, school/work, or goals. Keep it warm and personal. Mention the cartoonish portraits of people and animals she loves to draw.",
    ],
    /**
     * Artist portrait for the About page sidebar.
     * Upload to R2 under `key`, then set `placeholder: false`.
     */
    portrait: {
      key: "about/portrait.png",
      alt: "Portrait of Angely De Dios",
      placeholder: false,
    },
    highlights: [
      { label: "Focus", value: "Drawing · Digital Art · Cartoons · Animation" },
      { label: "Based in", value: "Seattle WA" },
      { label: "Available for", value: "Commissions / Collabs / School Projects" },
    ],
  },
} as const;
