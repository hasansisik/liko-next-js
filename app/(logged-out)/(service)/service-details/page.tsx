import React from "react";
import { Metadata } from "next";
import ServiceDetailsMain from "@/pages/service/service-details";
import { service_data } from "@/data/service-data";

export const metadata: Metadata = {
  title: "Liko - Service Details page",
};

const ServiceDetailsPage = () => {
  // Use the first service as default
  const defaultService = service_data[0];
  
  return (
    <ServiceDetailsMain service={defaultService} />
  );
};

export default ServiceDetailsPage;
