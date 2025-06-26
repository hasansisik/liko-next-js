import { IAboutUsData } from "@/types/about-us-d-t";

export const aboutUsData: IAboutUsData = {
  hero: {
    backgroundImage: "/assets/img/home-01/hero/dentist-2.jpg",
    subtitle: "Professional dental care",
    title: "Creating Healthy Smiles",
    description: "Comprehensive dental care with personalized treatment approach",
    scrollText: "Scroll to explore"
  },
  aboutInfo: {
    welcomeText: "Welcome!",
    mainContent: "We are a modern dental clinic dedicated to providing exceptional oral healthcare services in a comfortable and caring environment. Our experienced team of dental professionals is committed to helping you achieve and maintain optimal oral health with the latest technology and personalized treatment plans.",
    services: {
      title: "Our",
      subtitle: "SERVICES",
      servicesList: {
        column1: [
          "General Dentistry",
          "Cosmetic Dentistry", 
          "Teeth Whitening",
          "Dental Implants",
          "Root Canal Treatment"
        ],
        column2: [
          "Orthodontics",
          "Periodontal Care",
          "Oral Surgery",
          "Preventive Care"
        ]
      }
    }
  }
}; 