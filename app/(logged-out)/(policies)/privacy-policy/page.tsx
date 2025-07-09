"use client";

import React from "react";
import PrivacyPolicyMain from "@/page-components/policies/privacy-policy";
import SEOMetadata from "@/components/seo/seo-metadata";

const PrivacyPolicyPage = () => {
  return (
    <>
      <SEOMetadata 
        pageName="privacy-policy" 
        fallback={{
          title: "Liko - Privacy Policy",
          description: "Privacy Policy - How we protect and handle your personal information",
          keywords: ["privacy", "policy", "data protection", "personal information"]
        }}
      />
      <PrivacyPolicyMain/>
    </>
  );
};

export default PrivacyPolicyPage; 