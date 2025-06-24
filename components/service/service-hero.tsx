import React from "react";
import Image from "next/image";

// image
import ser_hero from "@/assets/img/inner-service/hero/hero-1.jpg";

export default function ServiceHero() {
  return (
    <div className="sv-hero-area sv-hero-ptb">
      <div className="container-fluid" style={{ 
        padding: '0 clamp(20px, 6vw, 300px)',
        maxWidth: '100%' 
      }}>
        <div className="row">
          <div className="col-xl-10">
            <div className="sv-hero-title-box">
              <h4 className="sv-hero-title tp-char-animation">
                Expert Dental <br /> Care Services
              </h4>
              <p className="tp_fade_bottom">
                Transform your smile with our comprehensive dental treatments and modern technology.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="sv-hero-thumb p-relative">
              <div className="sv-hero-thumb-box">
                <Image
                  data-speed=".7"
                  src={ser_hero}
                  alt="dental-services-hero"
                  style={{height:"auto"}}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
