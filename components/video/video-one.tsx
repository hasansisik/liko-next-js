'use client';
import React from 'react';

interface IVideoSectionData {
  videoSrc: string;
}

interface VideoOneProps {
  videoData: IVideoSectionData;
}

const VideOne = ({ videoData }: VideoOneProps) => {
  
  return (
    <>
      <div className="tp-hero-bottom-img-wrap">
        <div className="tp-hero-bottom-img" style={{
          width: '100%',
          height: 'auto',
          minHeight: '300px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <video 
            loop={true} 
            muted={true} 
            autoPlay={true} 
            playsInline={true}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              minHeight: '300px'
            }}
          >
            <source src={videoData.videoSrc} type="video/mp4" />
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