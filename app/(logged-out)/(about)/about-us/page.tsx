"use client";

import React from "react";
import AboutUsMain from "@/page-components/about/about-us";
import SEOMetadata from "@/components/seo/seo-metadata";

const AboutUsPage = () => {
  return (
    <>
      <SEOMetadata 
        pageName="about" 
        fallback={{
          title: "Liko - About Us",
          description: "Learn more about our creative agency and team",
          keywords: ["about", "team", "agency", "creative"]
        }}
      />
      <AboutUsMain/>
    </>
  );
};

export default AboutUsPage;
