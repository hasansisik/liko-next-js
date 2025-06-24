import React from "react";
import { Metadata } from "next";
import HipaaPrivacyNoticeMain from "@/pages/policies/hipaa-privacy-notice";

export const metadata: Metadata = {
  title: "Liko Dental - HIPAA Privacy Notice",
  description: "HIPAA Privacy Notice for Liko Dental Practice - Your rights regarding protected health information"
};

const HipaaPrivacyNoticeePage = () => {
  return (
    <HipaaPrivacyNoticeMain/>
  );
};

export default HipaaPrivacyNoticeePage; 