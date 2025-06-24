"use client";
import React from "react";

const BlogHeroBanner = () => {
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
              <div className="tp-hero-2-wrapper d-flex align-items-center justify-content-center p-relative" style={{ height: 'clamp(400px, 50vh, 500px)' }}>
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
                
                {/* Blog Title Content */}
                <div className="tp-hero-2-content-wrap p-relative text-center" style={{
                  zIndex: 5,
                  maxWidth: '800px',
                  padding: '20px',
                  paddingTop: 'clamp(60px, 15vh, 100px)'
                }}>
                  <div className="tp-hero-2-title-box">
                    <h1 className="tp-hero-2-title text-1 z-index-5" style={{
                      fontSize: 'clamp(30px, 6vw, 50px)',
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: 'clamp(10px, 3vw, 15px)',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                      lineHeight: '1.2'
                    }}>
                      DENTAL INSIGHTS
                    </h1>
                  </div>
                  <div className="tp-hero-2-content">
                    <p style={{
                      color: 'white',
                      fontSize: 'clamp(14px, 3vw, 18px)',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                      maxWidth: '600px',
                      margin: '0 auto',
                      lineHeight: '1.6',
                      fontWeight: '400'
                    }}>
                      DISCOVER EXPERT TIPS, TREATMENT TRENDS, AND REAL STORIES TO HELP YOU 
                      MAKE INFORMED DECISIONS ABOUT YOUR SMILE.
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