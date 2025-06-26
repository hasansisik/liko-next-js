export interface IBlogHeroData {
  videoSrc: string;
  title: string;
  description: string;
}

export interface IBigTextData {
  leftText: string;
  rightText: string;
  mainText: string;
  linkUrl: string;
}

export interface IBlogModernData {
  hero: IBlogHeroData;
  bigText: IBigTextData;
} 