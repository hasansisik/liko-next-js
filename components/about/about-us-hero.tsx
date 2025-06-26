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
              data-lag="0.2"
              data-stagger="0.08"
              style={{ marginBottom: '50px' }}
            >
              <span className="ab-inner-hero-subtitle" style={{
                fontSize: '13px',
                marginBottom: '15px'
              }}>
                {heroData.subtitle.split(' ').map((word, index, array) => (
                  <React.Fragment key={index}>
                    {word}
                    {index === Math.floor(array.length / 2) - 1 ? <br /> : ' '}
                  </React.Fragment>
                ))}
              </span>
              <h1 className="ab-inner-hero-title tp-char-animation" style={{
                fontSize: 'clamp(40px, 8vw, 90px)',
                marginBottom: '20px',
                lineHeight: '0.9'
              }}>
                {heroData.title}
              </h1>
              <p style={{
                fontSize: '16px',
                lineHeight: '24px',
                maxWidth: '400px'
              }}>
                {heroData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
