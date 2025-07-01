import React from "react";
import { Metadata } from "next";
import TermsOfServiceMain from "@/pages/policies/terms-of-service";

export const metadata: Metadata = {
  title: "Liko Dental - Terms of Service",
  description: "Terms of Service for Liko Dental Practice - Our terms and conditions for using our services"
};

const TermsOfServicePage = () => {
  return (
    <TermsOfServiceMain/>
  );
};

export default TermsOfServicePage; 