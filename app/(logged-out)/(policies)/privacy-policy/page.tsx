import React from "react";
import { Metadata } from "next";
import PrivacyPolicyMain from "@/pages/policies/privacy-policy";

export const metadata: Metadata = {
  title: "Liko Dental - Privacy Policy",
  description: "Privacy Policy for Liko Dental Practice - How we protect and handle your personal information"
};

const PrivacyPolicyPage = () => {
  return (
    <PrivacyPolicyMain/>
  );
};

export default PrivacyPolicyPage; 