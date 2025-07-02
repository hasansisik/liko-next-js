"use client";
import React from "react";
import { IBlogHeroData } from "../../types/blog-modern-d-t";
import useMobile from "@/hooks/use-mobile";

interface BlogHeroBannerProps {
  heroData: IBlogHeroData;
}

const BlogHeroBanner = ({ heroData }: BlogHeroBannerProps) => {
  const isMobile = useMobile();
  
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
              <div className="tp-hero-2-wrapper d-flex align-items-center justify-content-center p-relative" style={{ 
                height: isMobile ? 'clamp(300px, 40vh, 400px)' : 'clamp(400px, 50vh, 500px)' 
              }}>
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
                
                {/* Blog Title Content */}
                <div className="tp-hero-2-content-wrap p-relative text-center" style={{
                  zIndex: 5,
                  maxWidth: isMobile ? '100%' : '800px',
                  padding: isMobile ? '15px' : '20px',
                  paddingTop: isMobile ? 'clamp(40px, 10vh, 60px)' : 'clamp(60px, 15vh, 100px)'
                }}>
                  <div className="tp-hero-2-title-box">
                    <h1 className="tp-hero-2-title text-1 z-index-5" style={{
                      fontSize: isMobile ? 'clamp(24px, 5vw, 36px)' : 'clamp(30px, 6vw, 50px)',
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: isMobile ? 'clamp(8px, 2vw, 10px)' : 'clamp(10px, 3vw, 15px)',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                      lineHeight: '1.2'
                    }}>
                      {heroData.title}
                    </h1>
                  </div>
                  <div className="tp-hero-2-content">
                    <p style={{
                      color: 'white',
                      fontSize: isMobile ? 'clamp(12px, 2.5vw, 16px)' : 'clamp(14px, 3vw, 18px)',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                      maxWidth: isMobile ? '100%' : '600px',
                      margin: '0 auto',
                      lineHeight: '1.6',
                      fontWeight: '400'
                    }}>
                      {heroData.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeroBanner; 