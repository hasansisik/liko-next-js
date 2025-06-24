import { StaticImageData } from "next/image";

export interface IServiceDT {
  id: number;
  img: StaticImageData;
  title: string;
  category: string;
  desc: string;
  shortDesc?: string;
  price?: string;
  duration?: string;
  content: {
    htmlContent: string;
  };
} 