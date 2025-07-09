"use client";

import React from "react";
import ContactMain from "@/page-components/contact/contact";
import SEOMetadata from "@/components/seo/seo-metadata";

const ContactPage = () => {
  return (
    <>
      <SEOMetadata 
        pageName="contact" 
        fallback={{
          title: "Liko - Contact Us",
          description: "Get in touch with our creative agency team",
          keywords: ["contact", "get in touch", "agency", "support"]
        }}
      />
      <ContactMain/>
    </>
  );
};

export default ContactPage;
