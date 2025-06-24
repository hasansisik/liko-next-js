"use client";
import React from "react";
import Link from "next/link";
import { Leaf } from "../svg";
import ContactFormDental from "../form/contact-form-dental";

const HeroBannerTwo = () => {
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
                    <source src="/assets/img/home-01/video1.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="tp-hero-2-content-wrap p-relative d-none d-lg-block" style={{
                  maxWidth: '80%',
                  paddingRight: '100px'
                }}>
                  <div className="tp-hero-2-title-box">
                    <h2 className="tp-hero-2-title text-1 z-index-5 ">
                      Excellence in Aesthetics & Health
                    </h2>
                  </div>
                  <div className="tp-hero-2-content">
                    <p>
                      Rediscover your beauty with our {"Clinic's"} team of
                      experts, personalized solutions, and the latest
                      technology.
                    </p>
                  </div>
                </div>
                
                {/* Mobile Content */}
                <div className="tp-hero-2-content-wrap p-relative d-lg-none" style={{
                  width: '100%',
                  padding: '20px',
                  textAlign: 'center',
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  transform: 'translateY(-50%)',
                  zIndex: 5
                }}>
                  <div className="tp-hero-2-title-box">
                    <h1 style={{
                      fontSize: 'clamp(28px, 8vw, 40px)',
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: 'clamp(15px, 4vw, 20px)',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                      lineHeight: '1.2',
                      textAlign: 'center'
                    }}>
                      Excellence in Aesthetics & Health
                    </h1>
                  </div>
                  <div className="tp-hero-2-content">
                    <p style={{
                      color: 'white',
                      fontSize: 'clamp(14px, 4vw, 18px)',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                      maxWidth: 'min(90vw, 320px)',
                      margin: '0 auto',
                      lineHeight: '1.5',
                      fontWeight: '400',
                      textAlign: 'center'
                    }}>
                      Rediscover your beauty with our {"Clinic's"} team of
                      experts, personalized solutions, and the latest
                      technology.
                    </p>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div className="tp-hero-2-form-wrap d-none d-lg-block" style={{
                  position: 'absolute',
                  right: '50px',
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
          <div className="col-12" style={{ padding: 'clamp(15px, 5vw, 20px)' }}>
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
