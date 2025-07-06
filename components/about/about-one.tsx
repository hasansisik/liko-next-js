'use client';
import React, { CSSProperties, useEffect, useState } from 'react';
import Image from 'next/image';

interface IAboutSectionItem {
  id: number;
  image: string;
  title: string;
  description: string;
  imagePosition: 'left' | 'right';
}

interface IAboutSectionData {
  mainTitle: string;
  items: IAboutSectionItem[];
}

interface AboutOneProps {
  aboutData: IAboutSectionData;
}

// img style
const imgStyle:CSSProperties = {
  height: "auto",
  width: "100%",
  aspectRatio: "1/1",
  objectFit: "cover"
};

const AboutOne = ({ aboutData }: AboutOneProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
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

  return (
    <div className={`tp-about-2-area pt-100 ${isMobile ? 'pb-0' : 'pb-100'}`}>
      <div className="container container-1480">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-10">
            <div className={`tp-about-2-title-box tp-btn-trigger tp-btn-bounce ${isMobile ? 'mb-40' : 'mb-70'} text-start text-xl-center`}>
              <h2 className="tp-about-2-section-title">
                {aboutData.mainTitle}
              </h2>
            </div>
          </div>
        </div>
        
        {aboutData.items.map((item, index) => (
          <div key={item.id} className={`row align-items-center ${index < aboutData.items.length - 1 ? (isMobile ? 'mb-3' : 'mb-5') : ''}`}>
            {item.imagePosition === 'left' ? (
              <>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 order-1">
                  <div className="tp-about-2-thumb-box p-relative mb-4 mb-lg-0">
                    <div className="tp-about-2-thumb-main">
                      <Image src={item.image} alt="ab-img" width={500} height={500} style={imgStyle} />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-12 order-2">
                  <div className="tp-about-2-content ps-xl-4">
                    <span>{item.title}</span>
                    <p className={isMobile ? 'mb-15' : 'mb-30'}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-xl-6 col-lg-6 col-12 order-2 order-lg-1">
                  <div className="tp-about-2-content mb-4 mb-lg-0 pe-xl-4">
                    <span>{item.title}</span>
                    <p className={isMobile ? 'mb-15' : 'mb-30'}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 order-1 order-lg-2">
                  <div className="tp-about-2-thumb-box p-relative mb-4 mb-lg-0">
                    <div className="tp-about-2-thumb-main">
                      <Image src={item.image} alt="ab-img" width={500} height={500} style={imgStyle} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutOne;