// Type definitions
interface IHeroBannerData {
  videoSrc: string;
  desktopTitle: string;
  mobileTitle: string;
  description: string;
}

interface IServiceSectionData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface IAboutSectionItem {
  id: number;
  image: string;
  title: string;
  description: string;
  imagePosition: 'left' | 'right';
}

interface IAboutSectionData {
  mainTitle: string;
  items: IAboutSectionItem[];
}

interface IVideoSectionData {
  videoSrc: string;
}

interface IFaqItem {
  id: number;
  question: string;
  answer: string;
}

interface IFaqSectionData {
  title: string;
  description: string;
  shapeImage: string;
  faqItems: IFaqItem[];
}

interface ITeamMember {
  id: number;
  img: string;
}

interface ITeamSectionData {
  spacing?: string;
  teamMembers: ITeamMember[];
}

interface IHome1Data {
  heroBanner: IHeroBannerData;
  serviceSection: IServiceSectionData;
  aboutSection: IAboutSectionData;
  teamSection: ITeamSectionData;
  videoSection: IVideoSectionData;
  faqSection: IFaqSectionData;
}

export const home1Data: IHome1Data = {
  heroBanner: {
    videoSrc: "/assets/img/home-01/video1.mp4",
    desktopTitle: "Route to a Perfect Smile",
    mobileTitle: "Excellence in Aesthetics & Health",
    description: "Rediscover your beauty with our Clinic's team of experts, personalized solutions, and the latest technology."
  },
  serviceSection: {
    title: "Dental",
    subtitle: "Excellence",
    buttonText: "See All Services",
    buttonLink: "/service"
  },
  teamSection: {
    spacing: "pt-20",
    teamMembers: [
      {
        id: 1,
        img: "/assets/img/home-01/team/team-1-1.jpg"
      },
      {
        id: 2,
        img: "/assets/img/home-01/team/team-1-2.jpg"
      },
      {
        id: 3,
        img: "/assets/img/home-01/team/team-1-3.jpg"
      },
      {
        id: 4,
        img: "/assets/img/home-01/team/team-1-4.jpg"
      },
      {
        id: 5,
        img: "/assets/img/home-01/team/team-1-6.jpg"
      },
      {
        id: 6,
        img: "/assets/img/home-01/team/team-1-7.jpg"
      }
    ]
  },
  aboutSection: {
    mainTitle: "Cooperation is possible within various shapes and formats",
    items: [
      {
        id: 1,
        image: "/assets/img/home-01/ab-1.jpg",
        title: "FOLLOW FOR THE BEST EYEWEAR INSPIRATION",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
        imagePosition: 'left'
      },
      {
        id: 2,
        image: "/assets/img/home-01/ab-2.jpg",
        title: "FOLLOW FOR THE BEST EYEWEAR INSPIRATION",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
        imagePosition: 'right'
      },
      {
        id: 3,
        image: "/assets/img/home-01/ab-3.jpg",
        title: "FOLLOW FOR THE BEST EYEWEAR INSPIRATION",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
        imagePosition: 'left'
      },
      {
        id: 4,
        image: "/assets/img/home-01/ab-4.jpg",
        title: "FOLLOW FOR THE BEST EYEWEAR INSPIRATION",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
        imagePosition: 'right'
      }
    ]
  },
  videoSection: {
    videoSrc: "/assets/img/home-01/video1.mp4"
  },
  faqSection: {
    title: "Frequently Asked Question",
    description: "We believe in making life-long connections through great communication.",
    shapeImage: "/assets/img/home-02/service/sv-shape-1.png",
    faqItems: [
      {
        id: 1,
        question: "What we do1?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do. eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.!"
      },
      {
        id: 2,
        question: "2How we do it?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do. eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.!"
      },
      {
        id: 3,
        question: "3How can i download the products?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do. eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.!"
      },
      {
        id: 4,
        question: "4Free Shipping & Return Order",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do. eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.!"
      },
      {
        id: 5,
        question: "Payment options",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do. eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.!"
      },
      {
        id: 6,
        question: "Best Quality Products",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do. eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.!"
      }
    ]
  }
}; 