import React from "react";
import { Metadata } from "next";
import ContactMain from "@/page-components/contact/contact";

export const metadata: Metadata = {
  title: "Liko - Contact page",
};

const ContactPage = () => {
  return (
    <ContactMain/>
  );
};

export default ContactPage;
