import { IFooterData } from "../types/footer-d-t";

export const footerData: IFooterData = {
  company: {
    logo: "/assets/img/logo/logo-white.png",
    logoDark: "/assets/img/logo/logo.png",
    description: "Drop us a line sed id semper risus in hend rerit1."
  },
  office: {
    title: "Office",
    address: {
      text: "740 NEW SOUTH HEAD RD, TRIPLE BAY SWFW 3108, NEW YORK",
      url: "https://www.google.com/maps/@23.8223596,90.3656686,15z?entry=ttu"
    },
    phone: {
      text: "P: + 725 214 456",
      number: "+725214456"
    },
    email: {
      text: "E: contact@liko.com",
      address: "contact@liko.com"
    }
  },
  sitemap: {
    title: "Sitemap",
    links: [
      { text: "Home", url: "/" },
      { text: "About", url: "/about-us" },
      { text: "Contact", url: "/contact" },
      { text: "Blog", url: "/blog" },
      { text: "Services", url: "/service" }
    ]
  },
  legal: {
    title: "Legal & Policies",
    links: [
      { text: "Privacy Policy", url: "/privacy-policy" },
      { text: "Terms of Service", url: "/terms-of-service" },
      { text: "Cookie Policy", url: "/cookie-policy" },
      { text: "HIPAA Privacy Notice", url: "/hipaa-privacy-notice" }
    ]
  },
  copyright: {
    text: "All rights reserved — {year} © Themepure",
    socialLinks: [
      { text: "Linkedin", url: "https://www.linkedin.com/company/birimajans" },
      { text: "Twitter", url: "https://twitter.com/birimajans" },
      { text: "Instagram", url: "https://www.instagram.com/birimajans" }
    ]
  }
}; 