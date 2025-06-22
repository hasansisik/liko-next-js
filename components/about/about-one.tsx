'use client';
import React, { CSSProperties } from 'react';
import Image from 'next/image';
// images
import ab_1 from '@/assets/img/home-01/ab-1.jpg';
import ab_2 from '@/assets/img/home-01/ab-2.jpg';
import ab_3 from '@/assets/img/home-01/ab-3.jpg';
import ab_4 from '@/assets/img/home-01/ab-4.jpg';

// img style
const imgStyle:CSSProperties = {
  height: "auto",
  width: "100%",
  aspectRatio: "1/1",
  objectFit: "cover"
};

const AboutOne = () => {

  return (
    <div className="tp-about-2-area pt-125 pb-200">
      <div className="container container-1480">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-10">
            <div className="tp-about-2-title-box tp-btn-trigger tp-btn-bounce mb-70 text-start text-xl-center">
              <h2 className="tp-about-2-section-title">
                Cooperation is possible within
                various shapes and formats
              </h2>
            </div>
          </div>
        </div>
        
        {/* First Section: Image Left, Text Right */}
        <div className="row align-items-center mb-100">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="tp-about-2-thumb-box p-relative">
              <div className="tp-about-2-thumb-main">
                <Image src={ab_1} alt="ab-img" style={imgStyle} />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="tp-about-2-content">
              <span>FOLLOW FOR THE BEST EYEWEAR INSPIRATION</span>
              <p className="mb-30">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt .!
              </p>
            </div>
          </div>
        </div>

        {/* Second Section: Text Left, Image Right */}
        <div className="row align-items-center mb-100">
          <div className="col-xl-6 col-lg-6">
            <div className="tp-about-2-content">
              <span>FOLLOW FOR THE BEST EYEWEAR INSPIRATION</span>
              <p className="mb-30">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt .!
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="tp-about-2-thumb-box p-relative">
              <div className="tp-about-2-thumb-main">
                <Image src={ab_2} alt="ab-img" style={imgStyle} />
              </div>
            </div>
          </div>
        </div>

        {/* Third Section: Image Left, Text Right */}
        <div className="row align-items-center mb-100">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="tp-about-2-thumb-box p-relative">
              <div className="tp-about-2-thumb-main">
                <Image src={ab_3} alt="ab-img" style={imgStyle} />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="tp-about-2-content">
              <span>FOLLOW FOR THE BEST EYEWEAR INSPIRATION</span>
              <p className="mb-30">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt .!
              </p>
            </div>
          </div>
        </div>

        {/* Fourth Section: Text Left, Image Right */}
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6">
            <div className="tp-about-2-content">
              <span>FOLLOW FOR THE BEST EYEWEAR INSPIRATION</span>
              <p className="mb-30">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt .!
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="tp-about-2-thumb-box p-relative">
              <div className="tp-about-2-thumb-main">
                <Image src={ab_4} alt="ab-img" style={imgStyle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOne;