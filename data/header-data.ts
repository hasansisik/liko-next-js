import { IHeaderData } from "../types/header-d-t";

export const headerData: IHeaderData = {
  logo: {
    default: "/assets/img/logo/logo-white.png",
    dark: "/assets/img/logo/logo.png",
    sticky: "/assets/img/logo/logo.png",
    alt: "logo",
    dimensions: {
      default: { width: 150, height: 50 },
      sticky: { width: 120, height: 40 }
    }
  },
  navigation: {
    menus: [
      {
        id: 1,
        title: "Home",
        url: "/",
        hasDropdown: false
      },
      {
        id: 2,
        title: "About",
        url: "/about-us",
        hasDropdown: false
      },
      {
        id: 3,
        title: "Services",
        url: "/service",
        hasDropdown: true,
        subMenus: [
          { id: 31, title: "General Dentistry", url: "/service/general" },
          { id: 32, title: "Cosmetic Dentistry", url: "/service/cosmetic" },
          { id: 33, title: "Orthodontics", url: "/service/orthodontics" },
          { id: 34, title: "Oral Surgery", url: "/service/surgery" }
        ]
      },
      {
        id: 4,
        title: "Blog",
        url: "/blog",
        hasDropdown: false
      },
      {
        id: 5,
        title: "Contact",
        url: "/contact",
        hasDropdown: false
      }
    ],
    cta: {
      text: "Get Personal Advice",
      action: "openDialog"
    }
  },
  mobile: {
    hamburgerIcon: {
      lines: 2,
      animation: true
    }
  },
  dialog: {
    enabled: true,
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      closeOnClick: true
    },
    closeButton: {
      text: "×",
      size: "24px",
      position: { top: "15px", right: "15px" }
    }
  },
  styling: {
    container: {
      padding: "0 clamp(20px, 6vw, 300px)",
      maxWidth: "100%"
    },
    header: {
      padding: "10px 0",
      transition: "background-color 0.3s ease",
      stickyBackground: "white",
      transparentBackground: "transparent",
      boxShadow: {
        default: "none",
        sticky: "0 2px 10px rgba(0,0,0,0.1)"
      }
    },
    colors: {
      hamburger: {
        default: "white",
        black: "#333",
        white: "white",
        sticky: "#333"
      }
    }
  }
}; 