import React from "react";
import { scroller } from "react-scroll";
import { ScrollDown } from "../svg";

export default function AboutUsHero() {
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
        backgroundImage: "url(/assets/img/home-01/hero/dentist-2.jpg)",
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
            Scroll to explore
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
                Professional <br /> dental care
              </span>
              <h1 className="ab-inner-hero-title tp-char-animation" style={{
                fontSize: 'clamp(40px, 8vw, 90px)',
                marginBottom: '20px',
                lineHeight: '0.9'
              }}>
                Creating Healthy Smiles
              </h1>
              <p style={{
                fontSize: '16px',
                lineHeight: '24px',
                maxWidth: '400px'
              }}>Comprehensive dental care with personalized treatment approach</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
