"use client";

import React from "react";
import ServiceMain from "@/page-components/service/service";
import SEOMetadata from "@/components/seo/seo-metadata";

const ServicePage = () => {
  return (
    <>
      <SEOMetadata 
        pageName="services" 
        fallback={{
          title: "Liko - Our Services",
          description: "Explore our creative agency services and solutions",
          keywords: ["services", "creative", "solutions", "agency"]
        }}
      />
      <ServiceMain/>
    </>
  );
};

export default ServicePage;
