export interface IAboutUsHeroData {
  backgroundImage: string;
  subtitle: string;
  title: string;
  description: string;
  scrollText: string;
}

export interface IAboutUsInfoData {
  welcomeText: string;
  mainContent: string;
  services: {
    title: string;
    subtitle: string;
    servicesList: {
      column1: string[];
      column2: string[];
    };
  };
}

export interface IAboutUsData {
  hero: IAboutUsHeroData;
  aboutInfo: IAboutUsInfoData;
} 