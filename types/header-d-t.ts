export interface ISubMenu {
  id: number;
  title: string;
  url: string;
}

export interface IMenu {
  id: number;
  title: string;
  url: string;
  hasDropdown: boolean;
  subMenus?: ISubMenu[];
}

export interface INavigation {
  menus: IMenu[];
  cta: {
    text: string;
    action: string;
  };
}

export interface ILogo {
  default: string;
  dark: string;
  sticky: string;
  alt: string;
  dimensions: {
    default: { width: number; height: number };
    sticky: { width: number; height: number };
  };
}

export interface IMobile {
  hamburgerIcon: {
    lines: number;
    animation: boolean;
  };
  offcanvas?: {
    logo: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    information: {
      title: string;
      phone: {
        text: string;
        number: string;
      };
      email: {
        text: string;
        address: string;
      };
      address: {
        text: string;
        link?: string;
      };
    };
    socialMedia: {
      title: string;
      links: Array<{
        platform: string;
        url: string;
        icon: string;
      }>;
    };
  };
}

export interface IStyling {
  container: {
    padding: string;
    maxWidth: string;
  };
  header: {
    padding: string;
    transition: string;
    stickyBackground: string;
    transparentBackground: string;
    boxShadow: {
      default: string;
      sticky: string;
    };
  };
  colors: {
    hamburger: {
      default: string;
      black: string;
      white: string;
      sticky: string;
    };
  };
}

export interface IDialog {
  enabled: boolean;
  backdrop: {
    backgroundColor: string;
    closeOnClick: boolean;
  };
  closeButton: {
    text: string;
    size: string;
    position: { top: string; right: string };
  };
}

export interface IHeaderData {
  logo: ILogo;
  navigation: INavigation;
  mobile: IMobile;
  dialog: IDialog;
  styling: IStyling;
} 