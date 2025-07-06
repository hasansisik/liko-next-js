"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import TeamItem from "./team-item";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';

// Define slider settings with autoplay always enabled
const slider_setting: SwiperOptions = {
  slidesPerView: 6,
  loop: true,
  autoplay: {
    delay: 0, // Set to 0 for continuous movement
    disableOnInteraction: false,
  },
  speed: 5000, // Slow speed for continuous movement
  spaceBetween: 30,
  allowTouchMove: true, // Allow manual interaction
  breakpoints: {
    "1400": {
      slidesPerView: 6,
    },
    "1200": {
      slidesPerView: 4,
    },
    "992": {
      slidesPerView: 4,
    },
    "768": {
      slidesPerView: 3,
    },
    "576": {
      slidesPerView: 2,
    },
    "0": {
      slidesPerView: 1,
    },
  },
};

// Team member interface
interface ITeamMember {
  id: number;
  img: string;
}

// prop type
type IProps = {
  spacing?: string;
  teamData?: {
    spacing?: string;
    teamMembers: ITeamMember[];
  };
};

const TeamOne = ({ spacing = "pt-20", teamData }: IProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string>("");
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = React.useRef<any>(null);
  
  React.useEffect(() => {
    setMounted(true);
    
    // Add custom CSS to ensure autoplay works properly
    const style = document.createElement('style');
    style.innerHTML = `
      .tp-team-slider-active .swiper-wrapper {
        transition-timing-function: linear !important;
      }
      .tp-team-slider-wrapper {
        position: relative;
        overflow: hidden;
      }
      
      /* Fallback animation for browsers where Swiper autoplay might not work */
      @keyframes slideAnimation {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      .tp-team-slider-active.animate-fallback .swiper-wrapper {
        animation: slideAnimation 20s linear infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);
  
  // Initialize Swiper after component mount
  React.useEffect(() => {
    if (mounted && swiperRef.current && swiperRef.current.swiper) {
      // Force enable autoplay
      swiperRef.current.swiper.autoplay.start();
      
      // Set the correct speed and mode for continuous scrolling
      if (swiperRef.current.swiper.params.autoplay && typeof swiperRef.current.swiper.params.autoplay === 'object') {
        swiperRef.current.swiper.params.autoplay.delay = 0;
      }
      swiperRef.current.swiper.params.speed = 5000;
      swiperRef.current.swiper.params.loop = true;
      swiperRef.current.swiper.update();
      
      // Add fallback animation class after a short delay
      setTimeout(() => {
        const swiperElement = document.querySelector('.tp-team-slider-active');
        if (swiperElement) {
          swiperElement.classList.add('animate-fallback');
        }
      }, 1000);
    }
  }, [mounted]);
  
  // Check if we're on mobile when component mounts and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  function handleImageClick(imageSrc: string) {
    setSelectedImage(imageSrc);
    setShowModal(true);
  }
  
  // Return early if no team data
  if (!teamData?.teamMembers) {
    return null;
  }
  
  // Determine the spacing class based on mobile status
  const spacingClass = isMobile ? "pt-60" : (teamData.spacing || spacing);
  const bottomSpacing = isMobile ? "pb-50" : "pb-100";
  
  // Always ensure we have enough slides for loop mode
  // If not enough slides, duplicate them multiple times
  let teamMembers = [...teamData.teamMembers];
  // Duplicate slides multiple times to ensure smooth continuous scrolling
  teamMembers = [...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers];
  
  return (
    <>
      <div className={`tp-team-area ${spacingClass} ${bottomSpacing} fix`} style={isMobile ? { marginTop: '-20px' } : {}}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-team-slider-wrapper" style={{ overflow: 'hidden' }}>
                <Swiper
                  {...slider_setting}
                  modules={[Autoplay, FreeMode]}
                  className="swiper-container tp-team-slider-active"
                  ref={swiperRef}
                  onSwiper={(swiper) => {
                    // Ensure autoplay is enabled with correct settings
                    if (swiper.autoplay) {
                      if (swiper.params.autoplay && typeof swiper.params.autoplay === 'object') {
                        swiper.params.autoplay.delay = 0;
                      }
                      swiper.params.speed = 5000;
                      swiper.params.loop = true;
                      swiper.autoplay.start();
                      swiper.update();
                    }
                  }}
                >
                  {teamMembers.map((member, index) => (
                    <SwiperSlide key={`${member.id}-${index}`}>
                      <div className="tp-team-item" onClick={() => handleImageClick(member.img)}>
                        <div className="tp-team-thumb">
                          <Image
                            src={member.img}
                            alt="Team member"
                            width={300}
                            height={400}
                            style={{ 
                              objectFit: "cover",
                              cursor: "pointer",
                              transition: "transform 0.3s ease",
                              borderRadius: "8px"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Image Modal */}
      {mounted && showModal && createPortal(
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
          }}
          onClick={() => setShowModal(false)}
        >
          <div style={{ 
            position: 'relative', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}>
            <Image
              src={selectedImage}
              alt="Team member"
              width={600}
              height={800}
              style={{ 
                objectFit: 'contain',
                maxWidth: '80vw',
                maxHeight: '80vh',
                borderRadius: '15px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
              }}
            />
            {/* Close button inside image */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                fontSize: '24px',
                color: 'black',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
              }}
            >
              ×
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default TeamOne;
