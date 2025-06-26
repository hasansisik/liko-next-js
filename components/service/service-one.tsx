import React from "react";
import Image from "next/image";
import Link from "next/link";
import { service_data } from "@/data/service-data";

interface IServiceSectionData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface ServiceOneProps {
  serviceData: IServiceSectionData;
}

// Helper function to generate slug from title
const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

const ServiceOne = ({ serviceData }: ServiceOneProps) => {
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
              {service_data.slice(0, 4).map((s, i) => (
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
