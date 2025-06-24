import React from "react";
import Image from "next/image";
import Link from "next/link";
import { service_data } from "@/data/service-data";

// Helper function to generate slug from title
const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

const ServiceOne = () => {
  return (
    <div className="tp-service-area pt-180 pb-80 tp-btn-trigger">
      <div className="container container-1630">
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="tp-service-title-box p-relative">

              <h4 className="tp-section-title tp_fade_bottom">
                Dental
                <br />
                <span>Excellence</span>
              </h4>
            </div>
            <div className="tp-service-left-btn tp-btn-bounce">
              <Link className="tp-btn-border" href="/service">
                <span className="tp-btn-border-wrap">
                  <span className="text-1">See All Services</span>
                  <span className="text-2">See All Services</span>
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
                      <Link href={`/service-details/${generateSlug(s.title)}`}>{s.title}</Link>
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
