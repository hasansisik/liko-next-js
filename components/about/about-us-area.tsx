import React from "react";
import Image from "next/image";
import { Hand } from "../svg";
import { IAboutUsInfoData } from "@/types/about-us-d-t";

// images
import shape from "@/assets/img/inner-about/about/shape-1.png";
import ab_1 from "@/assets/img/inner-about/about/about-1.jpg";
import ab_2 from "@/assets/img/inner-about/about/about-3.jpg";
import ab_3 from "@/assets/img/inner-about/about/about-2.jpg";

interface AboutUsAreaProps {
  aboutData: IAboutUsInfoData;
}

export default function AboutUsArea({ aboutData }: AboutUsAreaProps) {
  return (
    <div className="ab-about-area ab-about-mt pb-90 z-index-5">
      <div className="container container-1480">

        <div id="about-info" className="row mt-200">
          <div className="col-xxl-9">
            <div className="ab-about-content p-relative">
              <span style={{
                fontSize: 'clamp(14px, 3vw, 18px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px'
              }}>
                <Hand />
                {aboutData.welcomeText}
              </span>
              <p className="tp-dropcap tp_fade_bottom">
                {aboutData.mainContent}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-9">
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-4 mb-40">
                <div className="ab-about-category-title-box p-relative">
                  <h4 className="ab-about-category-title">
                    {aboutData.services.title} <br />
                    <span>{aboutData.services.subtitle}</span>
                  </h4>
                  <Image
                    className="ab-about-shape-1 d-none d-md-block"
                    src={shape}
                    alt="shape"
                  />
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-8">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 mb-40">
                    <div className="ab-about-category-list category-space-1 tp_fade_bottom">
                      <ul>
                        {aboutData.services.servicesList.column1.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 mb-40">
                    <div className="ab-about-category-list category-space-2 tp_fade_bottom">
                      <ul>
                        {aboutData.services.servicesList.column2.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile-specific CSS for Welcome text */}
      <style jsx>{`
        @media (max-width: 768px) {
          .ab-about-area {
            padding-bottom: 40px !important;
          }
          
          .mt-200 {
            margin-top: 60px !important;
          }
          
          .ab-about-content {
            margin-bottom: 30px !important;
          }
          
          .ab-about-content span {
            font-size: 14px !important;
            margin-bottom: 15px !important;
          }
          
          .ab-about-content span svg {
            width: 16px !important;
            height: 16px !important;
          }
          
          .ab-about-content p {
            margin-bottom: 20px !important;
          }
        }
        
        @media (max-width: 480px) {
          .ab-about-area {
            padding-bottom: 30px !important;
          }
          
          .mt-200 {
            margin-top: 40px !important;
          }
          
          .ab-about-content {
            margin-bottom: 20px !important;
          }
          
          .ab-about-content span {
            font-size: 12px !important;
            margin-bottom: 10px !important;
          }
          
          .ab-about-content span svg {
            width: 14px !important;
            height: 14px !important;
          }
          
          .ab-about-content p {
            margin-bottom: 15px !important;
          }
        }
      `}</style>
    </div>
  );
}
