import React from "react";
import Image from "next/image";
import Link from "next/link";
import { service_data } from "@/data/service-data";
import { ServicePostData } from "@/redux/actions/servicePostActions";
import { useAppSelector } from "@/redux/hook";
import { IServiceDT } from "@/types/service-d-t";

interface IServiceSectionData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface ServiceOneProps {
  serviceData: IServiceSectionData;
  servicePosts?: ServicePostData[];
}

// Helper function to generate slug from title
const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

const ServiceOne = ({ serviceData, servicePosts }: ServiceOneProps) => {
  // If servicePosts is not provided as a prop, get it from Redux
  const { servicePosts: reduxServicePosts } = useAppSelector((state) => state.servicePosts);
  
  // Use provided servicePosts or get from Redux
  const serviceItems = servicePosts || reduxServicePosts;
  
  // Transform service posts to match IServiceDT interface
  const transformedServices = serviceItems?.length > 0 
    ? serviceItems.slice(0, 4).map(post => {
        // Create a properly structured IServiceDT object
        const serviceItem: IServiceDT = {
          id: parseInt(post._id?.slice(-6) || "1", 16),
          title: post.title,
          category: post.categories?.[0] || "Service",
          desc: post.desc || "",
          shortDesc: post.desc?.substring(0, 100) + (post.desc?.length > 100 ? '...' : ''),
          img: post.img || "/assets/img/service/default-service.jpg",
          features: post.tags || [],
          content: {
            htmlContent: post.content?.htmlContent || "<p>No content available</p>"
          }
        };
        return serviceItem;
      })
    : [];
  
  // Use transformed services if available, otherwise fallback to static data
  const displayServices = transformedServices.length > 0 
    ? transformedServices 
    : service_data.slice(0, 4);

  return (
    <div className="tp-service-area pt-180 pb-80 tp-btn-trigger">
      <div className="container container-1630">
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="tp-service-title-box p-relative">

              <h4 className="tp-section-title tp_fade_bottom">
                {serviceData.title}
                <br />
                <span>{serviceData.subtitle}</span>
              </h4>
            </div>
            <div className="tp-service-left-btn tp-btn-bounce">
              <Link className="tp-btn-border" href={serviceData.buttonLink}>
                <span className="tp-btn-border-wrap">
                  <span className="text-1">{serviceData.buttonText}</span>
                  <span className="text-2">{serviceData.buttonText}</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="tp-service-right-wrap">
              {displayServices.map((s, i) => (
                <div
                  key={s.id}
                  className="tp-service-item d-flex align-items-center mb-25 tp_fade_bottom"
                >
                  <div className="tp-service-icon">
                    <Image 
                      src={s.img} 
                      alt={s.title} 
                      width={200}
                      height={200}
                      style={{ 
                        height: "200px", 
                        width: "200px",
                        objectFit: "cover",
                        borderRadius: "8px"
                      }} 
                    />
                  </div>
                  <div className="tp-service-content">
                    <h4 className="tp-service-title-sm order-0">
                      <Link href={`/${generateSlug(s.title)}`}>{s.title}</Link>
                    </h4>
                    <p className="order-1">{s.shortDesc || s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceOne;
