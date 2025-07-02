import React from "react";
import { Metadata } from "next";
import CookiePolicyMain from "@/page-components/policies/cookie-policy";

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