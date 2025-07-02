import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactFormDental from "../form/contact-form-dental";
import { IServiceDT } from "@/types/service-d-t";
import { service_data } from "@/data/service-data";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { createSlug } from "@/utils/slug-utils";

// images
import sv_1 from "@/assets/img/inner-service/sercive-details/sv-details-1.jpg";
import sv_2 from "@/assets/img/inner-service/sercive-details/sv-details-2.jpg";
import sv_3 from "@/assets/img/inner-service/sercive-details/sv-details-3.jpg";

interface ServiceDetailsAreaProps {
  service: IServiceDT;
}

export default function ServiceDetailsArea({ service }: ServiceDetailsAreaProps) {
  const { servicePosts } = useSelector((state: RootState) => state.servicePosts);
  const [allServices, setAllServices] = useState<any[]>([]);
  
  // Get all services for sidebar
  useEffect(() => {
    if (servicePosts && servicePosts.length > 0) {
      setAllServices(servicePosts);
    }
  }, [servicePosts]);
  
  // Handle case where service might be undefined during build
  if (!service) {
    return (
      <div className="service-details__area service-details__space pt-200 pb-120">
        <div className="container-fluid" style={{ 
          padding: '0 clamp(20px, 6vw, 300px)',
          maxWidth: '100%' 
        }}>
          <div className="row">
            <div className="col-xl-12">
              <div className="service-details__title-box mb-40">
                <h4 className="sv-hero-title tp-char-animation">
                  Service Not Found
                </h4>
                <p>The requested service could not be found.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get other service images for the small thumbnails
  const otherServices = service_data.filter(s => s.id !== service.id);
  
  // Create slug for service links
  const getServiceSlug = (title: string) => {
    return createSlug(title);
  };
  
  return (
    <div className="service-details__area service-details__space pt-200 pb-120">
      <div className="container-fluid" style={{ 
        padding: '0 clamp(20px, 6vw, 300px)',
        maxWidth: '100%' 
      }}>
        <div className="row">
          <div className="col-xl-12">
            <div className="service-details__title-box mb-40">
              <span className="service-details__subtitle tp-char-animation">
                {service.category}
              </span>
              <h4 className="sv-hero-title tp-char-animation">
                {service.title}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-5">
              <div className="service-details__banner-text mb-80">
                <p className="mb-30 tp_title_anim">
                  {service.desc}
                </p>
                {service.shortDesc && (
                  <p className="tp_title_anim">
                    {service.shortDesc}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image container with padding and height limit */}
      <div className="container-fluid" style={{ 
        padding: '0 clamp(20px, 6vw, 300px)',
        maxWidth: '100%' 
      }}>
        <div className="row">
          <div className="col-xl-12">
            <div className="service-details__tab-wrapper text-center mb-120">
              <div className="service-details__tab-thumb" style={{
                height: '500px',
                overflow: 'hidden',
                borderRadius: '12px'
              }}>
                <Image
                  data-speed="0.4"
                  src={service.img}
                  alt={service.title}
                  width={1200}
                  height={500}
                  style={{ 
                    height: "100%",
                    width: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-fluid" style={{ 
        padding: '0 clamp(20px, 6vw, 300px)',
        maxWidth: '100%' 
      }}>
        <div className="row">
          <div className="col-xl-7 col-lg-7">
            <div className="service-details__left-wrap">
              {/* Service pricing and duration info */}
              {(service.price || service.duration) && (
                <div className="service-details__info-box mb-40">
                  <div className="row">
                    {service.price && (
                      <div className="col-md-6">
                        <div className="service-info-item">
                          <h5>Price</h5>
                          <p>{service.price}</p>
                        </div>
                      </div>
                    )}
                    {service.duration && (
                      <div className="col-md-6">
                        <div className="service-info-item">
                          <h5>Duration</h5>
                          <p>{service.duration}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Dynamic service content */}
              <div 
                className="service-details__content"
                dangerouslySetInnerHTML={{ __html: service.content.htmlContent }}
              />
              
              {/* Use other service images for small thumbnails */}
              {otherServices.length >= 2 && (
                <div className="service-details__sm-thumb-wrap mb-60">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 mb-20">
                      <div className="service-details__sm-thumb">
                        <Image
                          src={otherServices[0].img}
                          alt={otherServices[0].title}
                          width={600}
                          height={400}
                          style={{ height: "auto" }}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 mb-20">
                      <div className="service-details__sm-thumb">
                        <Image
                          src={otherServices[1].img}
                          alt={otherServices[1].title}
                          width={600}
                          height={400}
                          style={{ height: "auto" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-5 col-lg-5">
            <div className="service-details__right-wrap fix p-relative">
              <div className="service-details__rotate-text">
                <span>Our Services</span>
              </div>
              <div className="service-details__right-category">
                {allServices && allServices.length > 0 ? (
                  // Show dynamic services from API
                  allServices.slice(0, 10).map((serviceItem, index) => (
                    <Link 
                      key={index} 
                      href={`/${getServiceSlug(serviceItem.title)}`}
                    >
                      {serviceItem.title}
                    </Link>
                  ))
                ) : (
                  // Fallback to static services
                  <>
                    <Link href="/hollywood-smile">Hollywood Smile</Link>
                    <Link href="/dental-veneers">Dental Veneers</Link>
                    <Link href="/dental-implants">Dental Implants</Link>
                    <Link href="/smile-makeover">Smile Makeover</Link>
                    <Link href="/zirconium-crowns">Zirconium Crowns</Link>
                    <Link href="/e-max-crowns">E-Max Crowns</Link>
                  </>
                )}
              </div>
              <div className="service-details__right-text-box">
                <h4>
                  {service.title}
                </h4>
                <p className="mb-20">
                  {service.shortDesc || service.desc}
                </p>
                <Link
                  className="tp-btn-white background-black"
                  href="/contact"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dental Contact Form Section */}
        <div className="row mt-80 justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="service-details__contact-form-wrap">
              <div className="text-center mb-40">
                <h3>Ready to Get Started?</h3>
                <p>Contact us today to discuss your {service.title.toLowerCase()} treatment</p>
              </div>
              <ContactFormDental 
                style={{
                  maxWidth: '100%',
                  margin: '0 auto',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
