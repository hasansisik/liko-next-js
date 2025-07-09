"use client";

import React from "react";
import CookiePolicyMain from "@/page-components/policies/cookie-policy";
import SEOMetadata from "@/components/seo/seo-metadata";

const CookiePolicyPage = () => {
  return (
    <>
      <SEOMetadata 
        pageName="cookie-policy" 
        fallback={{
          title: "Liko - Cookie Policy",
          description: "Cookie Policy - How we use cookies on our website",
          keywords: ["cookie", "policy", "website", "tracking"]
        }}
      />
      <CookiePolicyMain/>
    </>
  );
};

export default CookiePolicyPage; 