'use client';
import React from 'react';

const VideOne = () => {
  
  return (
    <>
      <div className="tp-hero-bottom-img-wrap">
        <div className="tp-hero-bottom-img">
          <video loop={true} muted={true} autoPlay={true} playsInline={true}>
            <source src="/assets/img/home-01/video1.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="tp-brand-area">
        <div className="tp-brand-brd-top tp-brand-ptb">
          {/* Brand area spacing simulation */}
        </div>
      </div>
    </>
  );
};

export default VideOne;