import React from "react";
import { Metadata } from "next";
import ServiceDetailsMain from "@/pages/service/service-details";
import { service_data } from "@/data/service-data";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: serviceSlug } = await params;
  const service = service_data.find(
    (s) => s.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === serviceSlug
  );

  if (!service) {
    return {
      title: "Service Not Found - Liko Dental",
    };
  }

  return {
    title: `${service.title} - Liko Dental Services`,
    description: service.desc,
  };
}

// Generate static params for all services
export async function generateStaticParams() {
  return service_data.map((service) => ({
    slug: service.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
  }));
}

const ServiceDetailsPage = async ({ params }: Props) => {
  const { slug: serviceSlug } = await params;
  const service = service_data.find(
    (s) => s.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === serviceSlug
  );

  if (!service) {
    return (
      <div className="container text-center py-5">
        <h1>Service Not Found</h1>
        <p>The service you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return <ServiceDetailsMain service={service} />;
};

export default ServiceDetailsPage; 