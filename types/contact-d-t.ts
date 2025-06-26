export interface IContactHeroData {
  backgroundImage: string;
  subtitle: string;
  title: string;
}

export interface ISocialMediaItem {
  id: number;
  name: string;
  link: string;
}

export interface IContactFormData {
  title: string;
  subtitle: string;
  socialText: string;
  socialMedia: ISocialMediaItem[];
  form: {
    nameLabel: string;
    namePlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    buttonText: string;
  };
}

export interface IContactLocationItem {
  id: number;
  img: string;
  country: string;
  time: string;
  locationTitle: string;
  address: string;
  phone: string;
  email: string;
  mapsText: string;
  mapsUrl: string;
}

export interface IContactInfoData {
  locations: IContactLocationItem[];
}

export interface IContactData {
  hero: IContactHeroData;
  contactForm: IContactFormData;
  contactInfo: IContactInfoData;
} 