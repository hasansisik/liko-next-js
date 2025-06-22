"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Leaf } from "../svg";
import hero_bg from "@/assets/img/home-01/hero/dentist-1.jpg";

const HeroBannerTwo = () => {
  return (
    <div className="tp-hero-2-area tp-hero-2-pt">
      <div className="container container-1870">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-hero-2-wrapper-main">
              <div className="tp-hero-2-wrapper d-flex align-items-center p-relative">
                <div className="tp-hero-2-bg tp-gsap-bg tp-hero-bg-single">
                  <Image src={hero_bg} alt="hero-bg" />
                </div>
                <div className="tp-hero-2-content-wrap p-relative">
                  <div className="tp-hero-2-title-box">
                    <h2 className="tp-hero-2-title text-1 z-index-5 ">
                      Excellence 
                    </h2>
                    <h2 className="tp-hero-2-title text-2">
                      <span> in Aesthetics & Health</span>
                    </h2>
                  </div>
                  <div className="tp-hero-2-content">
                    <p>
                      Rediscover your beauty with our {"Clinic's"} team of
                      experts, personalized solutions, and the latest
                      technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerTwo;
