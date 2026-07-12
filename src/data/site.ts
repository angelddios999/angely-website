/**
 * Site-wide copy and metadata.
 * TODO: replace placeholder bio/contact details with real content.
 */
export const site = {
  name: "Angely",
  title: "Angely — Art & Animation Portfolio",
  description:
    "A portfolio of physical drawings, digital art, and short animations.",
  // TODO: replace with production URL when deployed
  url: "https://angely.example.com",
  nav: [
    { href: "/", label: "Home" },
    { href: "/physical", label: "Physical Art" },
    { href: "/digital", label: "Digital Art" },
    { href: "/animations", label: "Animations" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  social: [
    // TODO: replace with real profile URLs or remove
    { label: "Instagram", href: "#", todo: true },
    { label: "YouTube", href: "#", todo: true },
  ],
  contact: {
    // Display-only email on the contact page (form still goes through Resend)
    email: "hello@example.com", // TODO: replace
  },
} as const;
