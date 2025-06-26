export interface ILink {
  text: string;
  url: string;
}

export interface ICompanyData {
  logo: string;
  logoDark: string;
  description: string;
}

export interface IOfficeData {
  title: string;
  address: {
    text: string;
    url: string;
  };
  phone: {
    text: string;
    number: string;
  };
  email: {
    text: string;
    address: string;
  };
}

export interface ISitemapData {
  title: string;
  links: ILink[];
}

export interface ILegalData {
  title: string;
  links: ILink[];
}

export interface ICopyrightData {
  text: string; // {year} will be replaced with current year
  socialLinks: ILink[];
}

export interface IFooterData {
  company: ICompanyData;
  office: IOfficeData;
  sitemap: ISitemapData;
  legal: ILegalData;
  copyright: ICopyrightData;
} 