"use client";
import React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import TeamItem from "./team-item";

const slider_setting: SwiperOptions = {
  slidesPerView: 6,
  loop: true,
  autoplay: false,
  spaceBetween: 30,
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
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  function handleImageClick(imageSrc: string) {
    setSelectedImage(imageSrc);
    setShowModal(true);
  }
  
  // Return early if no team data
  if (!teamData?.teamMembers) {
    return null;
  }
  return (
    <>
      <div className={`tp-team-area ${teamData.spacing || spacing} pb-120 fix`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-team-slider-wrapper">
                <Swiper
                  {...slider_setting}
                  modules={[Autoplay, FreeMode]}
                  className="swiper-container tp-team-slider-active"
                >
                  {teamData.teamMembers.map((member) => (
                    <SwiperSlide key={member.id}>
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
