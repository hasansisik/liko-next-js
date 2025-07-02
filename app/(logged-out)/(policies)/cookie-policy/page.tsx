// Force dynamic rendering
export const dynamic = 'force-dynamic';
import React from "react";
import { Metadata } from "next";
import CookiePolicyMain from "@/pages/policies/cookie-policy";

export const metadata: Metadata = {
  title: "Liko Dental - Cookie Policy",
  description: "Cookie Policy for Liko Dental Practice - How we use cookies on our website"
};

const CookiePolicyPage = () => {
  return (
    <CookiePolicyMain/>
  );
};

export default CookiePolicyPage; 