interface IServiceHeroData {
  title: string;
  description: string;
  image: string;
}

interface IServiceSectionData {
  subtitle: string;
  title: string;
}

interface IBigTextData {
  leftText: string;
  rightText: string;
  mainText: string;
  linkUrl: string;
}

interface IServicePageData {
  hero: IServiceHeroData;
  serviceSection: IServiceSectionData;
  bigText: IBigTextData;
}

export const servicePageData: IServicePageData = {
  hero: {
    title: "Expert Dental Care Services",
    description: "Transform your smile with our comprehensive dental treatments and modern technology.",
    image: "/assets/img/inner-service/hero/hero-1.jpg"
  },
  serviceSection: {
    subtitle: "Services",
    title: "We provide comprehensive dental care with modern technology and personalized treatment plans."
  },
  bigText: {
    leftText: "CLINIC",
    rightText: "TOUCH", 
    mainText: "Get Contact",
    linkUrl: "/contact"
  }
}; 