import React from "react";
import Image from "next/image";
import Link from "next/link";
import { service_data } from "@/data/service-data";
import { ServicePostData } from "@/redux/actions/servicePostActions";

// Helper function to generate slug from title
const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

// service items
export function ServiceItems({ servicePosts }: { servicePosts?: ServicePostData[] }) {
  // Use service posts if available, otherwise fallback to static data
  const serviceItems = servicePosts?.length > 0 
    ? servicePosts.slice(0, 3).map(post => ({
        id: post._id,
        title: post.title,
        desc: post.desc,
        shortDesc: post.desc,
        img: post.img || "/assets/img/service/default-service.jpg"
      }))
    : service_data.slice(0, 3);

  return (
    <div className="row">
      <div className="col-xxl-3"></div>
      {serviceItems.map((item, index) => {
        return (
          <div key={item.id} className="col-xxl-3 col-xl-4 col-lg-4 col-md-6">
            <div className="tp-service-5-item tp_fade_bottom space-1">
              <div className="tp-service-4-icon">
                <Image 
                  src={item.img} 
                  alt={item.title}
                  width={120}
                  height={120}
                  style={{ 
                    height: "120px", 
                    width: "120px", 
                    objectFit: "cover",
                    borderRadius: "12px"
                  }}
                />
              </div>
              <div className="tp-service-4-content">
                <h4 className="tp-service-4-title-sm tp-text-black">
                  <Link href={`/${generateSlug(item.title)}`}>
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
          <ServiceItems />
        </div>
      </div>
    </div>
  );
}
