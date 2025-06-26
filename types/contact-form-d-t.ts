export interface ICountry {
  name: string;
  code: string;
  flag: string;
  phone: string;
}

export interface IContactFormData {
  title: string;
  subtitle: string;
  responseTime: string;
  showWhatsApp: boolean;
  whatsAppText: string;
  whatsAppLink: string;
  submitButtonText: string;
  placeholders: {
    name: string;
    phone: string;
    countrySearch: string;
  };
  defaultCountry: string;
  countries: ICountry[];
} 