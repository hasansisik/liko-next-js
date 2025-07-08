'use client';
import React, { useEffect, useRef } from 'react';

interface IVideoSectionData {
  videoSrc: string;
}

interface VideoOneProps {
  videoData: IVideoSectionData;
}

const VideOne = ({ videoData }: VideoOneProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force video reload when videoSrc changes
  useEffect(() => {
    if (videoRef.current && videoData.videoSrc) {
      videoRef.current.load(); // Force reload the video
    }
  }, [videoData.videoSrc]);
  
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
            ref={videoRef}
            key={videoData.videoSrc} // Force re-render when video source changes
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
            onError={(e) => {
              console.error('Video section load error:', e);
            }}
            onLoadStart={() => {
              console.log('Video section loading started:', videoData.videoSrc);
            }}
          >
            <source src={videoData.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
};

export default VideOne;