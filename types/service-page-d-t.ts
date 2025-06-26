export interface IServiceHeroData {
  title: string;
  description: string;
  image: string;
}

export interface IServiceSectionData {
  subtitle: string;
  title: string;
}

export interface IBigTextData {
  leftText: string;
  rightText: string;
  mainText: string;
  linkUrl: string;
}

export interface IServicePageData {
  hero: IServiceHeroData;
  serviceSection: IServiceSectionData;
  bigText: IBigTextData;
} 