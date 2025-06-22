'use client';
import React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { fadeAnimation } from "@/utils/title-animation";

const HeroBannerOne = () => {
  useGSAP(() => {
  
    if(typeof window !== 'undefined'){
      setTimeout(() => {
        fadeAnimation();
      },100)
    }
  }, {});
  return (
    <div className="tp-hero-area tp-hero-ptb main-slider">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xxl-12">
            <div className="tp-hero-title-wrap mb-35 p-relative">
              <div className="tp-hero-shape-1">
                <Image
                  src="/assets/img/home-01/hero/hero-bg-shape-1-1.svg"
                  alt="shape"
                  width={790}
                  height={700}
                  style={{ height: "auto" }}
                />
              </div>
              <div className="tp-hero-title-box text-center p-relative">
                <h1 className="tp-hero-title tp_fade_bottom">
                  <span className="p-relative">
                  Transform
                    <span className="tp-hero-shape-2 d-none d-md-block">
                      <Image
                        src="/assets/img/home-01/hero/hero-shape-1-1.png"
                        alt="shape"
                        width={40}
                        height={40}
                      />
                    </span>
                  </span>
                  <br />
                  Travel
                  <span className="tp-hero-title-img">
                    <Image
                      className="tp-zoom-img"
                      src="/assets/img/home-01/hero/dentist-2.jpg"
                      alt="hero-img"
                      width={270}
                      height={160}
                      style={{ height: "auto", borderRadius: "300px"}}
                    />
                  </span>
                  Smile
                </h1>
              </div>
            </div>
            <div className="tp-hero-content tp_fade_bottom">
              <p className="text-center">
                Experience world-class dental care while enjoying the beauty of Turkey. Trusted by thousands of international patients for safe, affordable, and aesthetic treatments
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerOne;
