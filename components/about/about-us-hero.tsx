import React from "react";
import { scroller } from "react-scroll";
import { ScrollDown } from "../svg";
import { IAboutUsHeroData } from "@/types/about-us-d-t";

interface AboutUsHeroProps {
  heroData: IAboutUsHeroData;
}

export default function AboutUsHero({ heroData }: AboutUsHeroProps) {
  const scrollTo = () => {
    scroller.scrollTo('about-info', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };
  
  return (
    <div
      className="ab-inner-hero-area ab-inner-hero-bg p-relative"
      style={{
        backgroundImage: `url(${heroData.backgroundImage})`,
        paddingTop: '200px',
        paddingBottom: '45px'
      }}
    >
      <div className="breadcurmb-site d-none">
        <h6>About Us</h6>
      </div>
      <div className="ab-inner-hero-scroll smooth">
        <a className="pointer" onClick={scrollTo}>
          <span>
            {heroData.scrollText}
            <ScrollDown />
          </span>
        </a>
      </div>
      <div className="container container-1480">
        <div className="row">
          <div className="col-xl-8">
            <div
              className="ab-inner-hero-title-box"
              style={{ 
                marginBottom: '50px',
                position: 'relative',
                zIndex: 1
              }}
            >
              <span 
                className="ab-inner-hero-subtitle" 
                style={{
                  fontSize: '13px',
                  marginBottom: '15px',
                  display: 'block',
                  lineHeight: '1.4',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {heroData.subtitle.split(' ').map((word, index, array) => (
                  <React.Fragment key={index}>
                    {word}
                    {index === Math.floor(array.length / 2) - 1 ? <br /> : ' '}
                  </React.Fragment>
                ))}
              </span>
              
              {/* Desktop Title with Animation */}
              <h1 
                className="ab-inner-hero-title tp-char-animation d-none d-md-block" 
                style={{
                  fontSize: 'clamp(60px, 8vw, 90px)',
                  marginBottom: '20px',
                  lineHeight: '0.9',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {heroData.title}
              </h1>
              
              {/* Mobile Title without Animation */}
              <h1 
                className="ab-inner-hero-title-mobile d-block d-md-none" 
                style={{
                  fontSize: 'clamp(28px, 8vw, 40px)',
                  marginBottom: '20px',
                  lineHeight: '1.2',
                  position: 'relative',
                  zIndex: 2,
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  wordSpacing: '0.2em'
                }}
              >
                {heroData.title}
              </h1>
              
              <p style={{
                fontSize: 'clamp(14px, 3vw, 16px)',
                lineHeight: 'clamp(20px, 4vw, 24px)',
                maxWidth: '400px',
                position: 'relative',
                zIndex: 2,
                marginTop: '20px'
              }}>
                {heroData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile-specific CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .ab-inner-hero-title-box {
            padding: 0 15px !important;
          }
          
          .ab-inner-hero-title-mobile {
            font-family: inherit !important;
            color: white !important;
            text-transform: inherit !important;
            white-space: normal !important;
            word-spacing: 0.3em !important;
            letter-spacing: 1px !important;
          }
          
          /* Hide any animation classes on mobile */
          .tp-char-animation {
            display: none !important;
          }
        }
        
        @media (max-width: 480px) {
          .ab-inner-hero-area {
            padding-top: 150px !important;
            padding-bottom: 30px !important;
          }
          
          .ab-inner-hero-title-mobile {
            margin-bottom: 15px !important;
            font-size: 24px !important;
            line-height: 1.3 !important;
            word-spacing: 0.2em !important;
            color: white !important;
          }
        }
        
        .mobile-hero-title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          line-height: 1.2;
          font-weight: 700;
          word-spacing: 0.1em;
          letter-spacing: 0.02em;
          color: white;
        }
        
        @media (max-width: 767px) {
          .mobile-hero-title {
            font-size: clamp(2rem, 7vw, 3rem);
            color: white;
          }
        }
      `}</style>
    </div>
  );
}
