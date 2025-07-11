import { StaticImageData } from "next/image";

export interface IBlogComment {
  id: number;
  name: string;
  avatar: string;
  date: string;
  comment: string;
}

export interface IBlogDT {
  id: number;
  slug?: string;
  img?: StaticImageData | string;
  images?: (StaticImageData | string)[];
  title: string;
  date: string;
  category: string;
  author: string;
  videoId?: string;
  avatar?: StaticImageData | string;
  blogQuote?: boolean;
  video?: boolean;
  imgSlider?: boolean;
  blogQuoteTwo?: boolean;
  blogHeroSlider?: boolean;
  desc?: string;
  content?: {
    htmlContent: string;
  };
  comments?: IBlogComment[];
  commentCount?: number;
}