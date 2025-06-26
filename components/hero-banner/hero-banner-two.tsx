"use client";
import React from "react";
import Link from "next/link";
import { Leaf } from "../svg";
import ContactFormDental from "../form/contact-form-dental";

interface IHeroBannerData {
  videoSrc: string;
  desktopTitle: string;
  mobileTitle: string;
  description: string;
}

interface HeroBannerTwoProps {
  heroData: IHeroBannerData;
}

const HeroBannerTwo = ({ heroData }: HeroBannerTwoProps) => {
  return (
    <div className="tp-hero-2-area" style={{ 
      paddingTop: '0', 
      marginTop: '0',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="container-fluid" style={{ 
        padding: '0',
        maxWidth: '100%' 
      }}>
        <div className="row" style={{ margin: '0' }}>
          <div className="col-xl-12" style={{ padding: '0' }}>
            <div className="tp-hero-2-wrapper-main">
              <div className="tp-hero-2-wrapper d-flex align-items-center p-relative" style={{ minHeight: '100vh' }}>
                <div className="tp-hero-2-bg tp-gsap-bg tp-hero-bg-single" style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  zIndex: -1
                }}>
                  <video 
                    loop={true} 
                    muted={true} 
                    autoPlay={true} 
                    playsInline={true}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  >
                    <source src={heroData.videoSrc} type="video/mp4" />
                  </video>
                </div>
                <div className="tp-hero-2-content-wrap p-relative d-none d-lg-block" style={{
                  maxWidth: '80%',
                  paddingLeft: 'clamp(20px, 5vw, 0px)',
                  paddingRight: 'clamp(20px, 5vw, 0px)'
                }}>
                  <div className="tp-hero-2-title-box" style={{
                    margin: '0',
                    padding: '0'
                  }}>
                    <h2 className="tp-hero-2-title text-1 z-index-5" style={{
                      margin: '0 0 20px 0',
                      padding: '0',
                      color: 'white',
                      fontSize: 'clamp(40px, 8vw, 80px)',
                      fontWeight: 'bold',
                      lineHeight: '1.8'
                    }}>
                      {heroData.desktopTitle}
                    </h2>
                  </div>
                  <div className="tp-hero-2-content" style={{
                    margin: '0',
                    padding: '0'
                  }}>
                    <p style={{
                      margin: '0',
                      padding: '0',
                      color: 'white',
                      fontSize: '20px',
                      lineHeight: '1.6'
                    }}>
                      {heroData.description}
                    </p>
                  </div>
                </div>
                
                {/* Mobile Content */}
                <div className="tp-hero-2-content-wrap p-relative d-lg-none" style={{
                  width: '100%',
                  padding: '20px clamp(20px, 5vw, 40px)',
                  textAlign: 'left',
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  transform: 'translateY(-50%)',
                  zIndex: 5
                }}>
                  <div className="tp-hero-2-title-box" style={{
                    margin: '0',
                    padding: '0'
                  }}>
                    <h1 style={{
                      fontSize: 'clamp(24px, 6vw, 40px)',
                      fontWeight: 'bold',
                      color: 'white',
                      margin: '0 0 clamp(15px, 4vw, 20px) 0',
                      padding: '0',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                      lineHeight: '1.3',
                      textAlign: 'left'
                    }}>
                      {heroData.mobileTitle}
                    </h1>
                  </div>
                  <div className="tp-hero-2-content" style={{
                    margin: '0',
                    padding: '0'
                  }}>
                    <p style={{
                      color: 'white',
                      fontSize: 'clamp(14px, 3.5vw, 18px)',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                      maxWidth: '100%',
                      margin: '0',
                      padding: '0',
                      lineHeight: '1.5',
                      fontWeight: '400',
                      textAlign: 'left'
                    }}>
                      {heroData.description}
                    </p>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="tp-hero-2-form-wrap d-none d-lg-block" style={{
                  position: 'absolute',
                  right: 'clamp(20px, 5vw, 200px)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10
                }}>
                  <ContactFormDental 
                    style={{
                      width: '500px',
                      maxWidth: '90vw'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Contact Form */}
        <div className="row d-lg-none" style={{ 
          margin: '0', 
          position: 'relative',
          marginTop: 'clamp(-200px, -25vh, -150px)',
          zIndex: 10
        }}>
          <div className="col-12" style={{ padding: 'clamp(15px, 5vw, 20px) clamp(20px, 5vw, 40px)' }}>
            <ContactFormDental 
              style={{
                maxWidth: 'min(90vw, 500px)',
                margin: '0 auto'
              }}
            />
          </div>
        </div>
        
        {/* Mobile Bottom Spacing */}
        <div className="d-lg-none" style={{ height: '50px' }}></div>
      </div>
    </div>
  );
};

export default HeroBannerTwo;
