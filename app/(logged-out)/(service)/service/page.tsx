import React from "react";
import { Metadata } from "next";
import ServiceMain from "@/page-components/service/service";

export const metadata: Metadata = {
  title: "Liko - Service page",
};

const ServicePage = () => {
  return (
    <ServiceMain/>
  );
};

export default ServicePage;
