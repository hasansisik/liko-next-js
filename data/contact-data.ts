import { IContactData } from "../types/contact-d-t";

export const contactData: IContactData = {
  hero: {
    backgroundImage: "/assets/img/home-01/team/team-details-bg.png",
    subtitle: "Liko Studio",
    title: "Get in touch"
  },
  contactForm: {
    title: "Send a Message",
    subtitle: "Contact Us",
    socialText: "Follow us",
    socialMedia: [
      {
        id: 1,
        name: "LinkedIn",
        link: "https://www.linkedin.com/company/birimajans"
      },
      {
        id: 2,
        name: "Twitter",
        link: "https://twitter.com/birimajans"
      },
      {
        id: 3,
        name: "Instagram",
        link: "https://www.instagram.com/birimajans"
      },
      {
        id: 4,
        name: "Facebook",
        link: "https://www.facebook.com/birimajans"
      }
    ],
    form: {
      nameLabel: "Name",
      namePlaceholder: "John Doe",
      subjectLabel: "Subject", 
      subjectPlaceholder: "Your@email.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell Us About Your Project",
      buttonText: "Send Message"
    }
  },
  contactInfo: {
    locations: [
      {
        id: 1,
        img: "/assets/img/home-01/tr.jpg",
        country: "Istanbul",
        time: "12:00 pm GMT+3",
        locationTitle: "Birim Ajans Clinic",
        address: "Birim Studio, 43 Appleton <br /> Lane, 3287 Istanbul",
        phone: "(+90) 532 123 45 67",
        email: "info@birimajans.com",
        mapsText: "Google Maps",
        mapsUrl: "https://www.google.com/maps"
      }
    ]
  }
}; 