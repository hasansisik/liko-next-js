import React from "react";
import Image from "next/image";
import Link from "next/link";
import { service_data } from "@/data/service-data";
// images
import s_1 from "@/assets/img/home-01/service/service-icon-1.png";
import s_2 from "@/assets/img/home-01/service/service-icon-2.png";
import s_3 from "@/assets/img/home-01/service/service-icon-3.png";
import s_4 from "@/assets/img/home-01/service/service-icon-4.png";

// Helper function to generate slug from title
const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

// service items
export function ServiceItems() {
  return (
    <div className="row">
      <div className="col-xxl-3"></div>
      {service_data.slice(0, 3).map((item, index) => {
        // Use different icons for each service
        const icons = [s_2, s_1, s_3, s_4];
        const icon = icons[index % icons.length];
        
        return (
          <div key={item.id} className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
            <div className="tp-service-5-item tp_fade_bottom space-1">
              <div className="tp-service-4-icon">
                <Image src={icon} alt="icon" />
              </div>
              <div className="tp-service-4-content">
                <h4 className="tp-service-4-title-sm tp-text-black">
                  <Link href={`/service-details/${generateSlug(item.title)}`}>
                    {item.title}
                  </Link>
                </h4>
                <p>{item.shortDesc || item.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// service five area
export default function ServiceFive() {
  return (
    <div className="tp-service-5-area pt-120 pb-70">
      <div className="container container-1775">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-service-5-title-box mb-90">
              <h4 className="tp-service-5-title p-relative tp_fade_right">
                <span className="tp-service-5-subtitle tp_fade_left">
                  SERVICES
                </span>
                <span className="text-space"></span>
                Expert dental care with modern technology and <br />
                personalized treatment plans for your perfect smile
              </h4>
            </div>
          </div>
        </div>
        <div className="tp-service-5-wrap">
          <ServiceItems/>
        </div>
      </div>
    </div>
  );
}
