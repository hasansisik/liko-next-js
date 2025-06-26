import React from "react";
import Image from "next/image";
interface IServiceHeroData {
  title: string;
  description: string;
  image: string;
}

interface ServiceHeroProps {
  heroData: IServiceHeroData;
}

export default function ServiceHero({ heroData }: ServiceHeroProps) {
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
                {heroData.title.split(' ').map((word, index, array) => (
                  <React.Fragment key={index}>
                    {word}
                    {index === Math.floor(array.length / 2) - 1 ? <br /> : ' '}
                  </React.Fragment>
                ))}
              </h4>
              <p className="tp_fade_bottom">
                {heroData.description}
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
                  src={heroData.image}
                  alt="dental-services-hero"
                  width={1200}
                  height={600}
                  style={{height:"auto", width:"100%", objectFit:"cover"}}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
