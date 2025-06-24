"use client";
import React from "react";
import Link from "next/link";
import { Leaf } from "../svg";

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
                  <div className="tp-hero-2-form-box" style={{
                    background: 'white',
                    padding: 'clamp(20px, 5vw, 25px)',
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    width: '500px',
                    maxWidth: '90vw'
                  }}>
                    <div className="tp-hero-2-form-header" style={{ marginBottom: '20px' }}>
                      <h3 className="tp-hero-2-form-title" style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        color: '#333'
                      }}>Let&apos;s Talk Teeth!</h3>
                      <div className="tp-hero-2-form-status" style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '5px'
                      }}>
                        <span className="tp-hero-2-status-dot" style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#4CAF50',
                          borderRadius: '50%',
                          marginRight: '8px'
                        }}></span>
                        <span className="tp-hero-2-status-text" style={{
                          color: '#4CAF50',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>Online now</span>
                      </div>
                      <p className="tp-hero-2-form-response" style={{
                        fontSize: '12px',
                        color: '#666',
                        margin: '0'
                      }}>avg. response time: 3 minutes</p>
                    </div>
                    
                    <form className="tp-hero-2-form">
                      <div className="tp-hero-2-form-input" style={{ marginBottom: '15px' }}>
                        <input 
                          type="text" 
                          placeholder="Name*" 
                          required 
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      
                      <div className="tp-hero-2-form-phone" style={{
                        display: 'flex',
                        marginBottom: '20px'
                      }}>
                        <div className="tp-hero-2-phone-prefix" style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRight: 'none',
                          borderRadius: '5px 0 0 5px',
                          backgroundColor: '#f8f9fa',
                          minWidth: '80px'
                        }}>
                          <span className="tp-hero-2-flag" style={{ marginRight: '5px' }}>🇹🇷</span>
                          <span style={{ fontSize: '14px' }}>+90</span>
                        </div>
                        <input 
                          type="tel" 
                          placeholder="Phone Number*" 
                          required 
                          style={{
                            flex: 1,
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '0 5px 5px 0',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      
                      <button type="submit" className="tp-hero-2-form-btn" style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        marginBottom: '15px'
                      }}>
                        Send →
                      </button>
                    
                      
                      <Link href="#" className="tp-hero-2-whatsapp-btn" style={{
                        display: 'block',
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#25D366',
                        color: 'white',
                        textAlign: 'center',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}>
                       Chat on WhatsApp
                      </Link>
                    </form>
                  </div>
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
            <div className="tp-hero-2-form-box" style={{
              background: 'white',
              padding: '25px',
              borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              width: '100%',
              maxWidth: 'min(90vw, 500px)',
              margin: '0 auto'
            }}>
              <div className="tp-hero-2-form-header" style={{ marginBottom: '20px' }}>
                <h3 className="tp-hero-2-form-title" style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: '#333'
                }}>Let&apos;s Talk Teeth!</h3>
                <div className="tp-hero-2-form-status" style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px'
                }}>
                  <span className="tp-hero-2-status-dot" style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#4CAF50',
                    borderRadius: '50%',
                    marginRight: '8px'
                  }}></span>
                  <span className="tp-hero-2-status-text" style={{
                    color: '#4CAF50',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>Online now</span>
                </div>
                <p className="tp-hero-2-form-response" style={{
                  fontSize: '12px',
                  color: '#666',
                  margin: '0'
                }}>avg. response time: 3 minutes</p>
              </div>
              
              <form className="tp-hero-2-form">
                <div className="tp-hero-2-form-input" style={{ marginBottom: '15px' }}>
                  <input 
                    type="text" 
                    placeholder="Name*" 
                    required 
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                <div className="tp-hero-2-form-phone" style={{
                  display: 'flex',
                  marginBottom: '20px'
                }}>
                  <div className="tp-hero-2-phone-prefix" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRight: 'none',
                    borderRadius: '5px 0 0 5px',
                    backgroundColor: '#f8f9fa',
                    minWidth: '80px'
                  }}>
                    <span className="tp-hero-2-flag" style={{ marginRight: '5px' }}>🇹🇷</span>
                    <span style={{ fontSize: '14px' }}>+90</span>
                  </div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number*" 
                    required 
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '0 5px 5px 0',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                <button type="submit" className="tp-hero-2-form-btn" style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginBottom: '15px'
                }}>
                  Send →
                </button>
              
                
                <Link href="#" className="tp-hero-2-whatsapp-btn" style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#25D366',
                  color: 'white',
                  textAlign: 'center',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: '500'
                }}>
                 Chat on WhatsApp
                </Link>
              </form>
            </div>
          </div>
        </div>
        
        {/* Mobile Bottom Spacing */}
        <div className="d-lg-none" style={{ height: '50px' }}></div>
      </div>
    </div>
  );
};

export default HeroBannerTwo;
