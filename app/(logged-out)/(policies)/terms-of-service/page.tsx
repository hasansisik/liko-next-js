"use client";

import React from "react";
import TermsOfServiceMain from "@/page-components/policies/terms-of-service";
import SEOMetadata from "@/components/seo/seo-metadata";

const TermsOfServicePage = () => {
  return (
    <>
      <SEOMetadata 
        pageName="terms-of-service" 
        fallback={{
          title: "Liko - Terms of Service",
          description: "Terms of Service - Our terms and conditions for using our services",
          keywords: ["terms", "service", "conditions", "agreement"]
        }}
      />
      <TermsOfServiceMain/>
    </>
  );
};

export default TermsOfServicePage; 