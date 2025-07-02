import React from "react";
import { Metadata } from "next";
import AboutUsMain from "@/page-components/about/about-us";

export const metadata: Metadata = {
  title: "Liko - About us page",
};

const AboutUsPage = () => {
  return (
    <AboutUsMain/>
  );
};

export default AboutUsPage;
