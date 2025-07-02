import React from "react";
import Image from "next/image";
import Link from "next/link";
import { service_data } from "@/data/service-data";
import { RightArrow, ShapeTwo } from "../svg";
import { ServicePostData } from "@/redux/actions/servicePostActions";

// Helper function to generate slug from title
const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

export default function ServiceSix({ servicePosts }: { servicePosts?: ServicePostData[] }) {
  // Use service posts if available, otherwise fallback to static data
  const serviceItems = servicePosts && servicePosts.length > 0 
    ? servicePosts.map((post, index) => ({
        id: post._id,
        title: post.title,
        desc: post.desc,
        category: post.categories?.[0] || "Service",
        img: post.img || "/assets/img/service/default-service.jpg",
        features: post.tags || []
      }))
    : service_data;

  return (
    <div className="sv-service-area project-panel-area-2 mb-50">
      <div className="container-fluid p-0">
        {serviceItems.map((item, index) => (
          <div key={item.id} className="sv-service-item project-panel-2">
            <div className="row g-0">
              <div className="col-xl-6 col-lg-6">
                <div className="sv-service-thumb">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={600}
                    height={400}
                    style={{ 
                      height: "auto", 
                      width: "100%", 
                      objectFit: "cover" 
                    }}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="sv-service-content-wrap d-flex align-items-center">
                  <div className="sv-service-content">
                    <div className="sv-service-title-box">
                      <span className="sv-service-subtitle">
                        <i>{index + 1 < 9 ? "0" + (index + 1) : index + 1}</i>
                        {item.category}
                      </span>
                      <h4 className="sv-service-title">{item.title}</h4>
                    </div>
                    <div className="sv-service-space-wrap">
                      <div className="sv-service-text">
                        <p>{item.desc}</p>
                      </div>
                      <div className="sv-service-list">
                        <ul>
                          {item.features?.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="sv-service-btn">
                        <Link
                          className="tp-btn-zikzak zikzak-inner p-relative"
                          href={`/${generateSlug(item.title)}`}
                        >
                          <span className="zikzak-content">
                            See <br /> Details
                            <RightArrow clr="currentColor" />
                          </span>
                          <ShapeTwo />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
