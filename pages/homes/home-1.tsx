"use client";
import { gsap } from "gsap";
import React, { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import {
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
  cursorAnimation,
} from "@/plugins";
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/header-one";
import HeroBannerOne from "@/components/hero-banner/hero-banner-one";

import ServiceOne from "@/components/service/service-one";
import VideOne from "@/components/video/video-one";
import TeamOne from "@/components/team/team-one";
import FooterOne from "@/layouts/footers/footer-one";


// animation
import { videoAnimOne } from "@/utils/video-anim";
import { teamMarqueAnim } from "@/utils/scroll-marque";
import { hoverBtn } from "@/utils/hover-btn";
import { footerTwoAnimation } from "@/utils/footer-anim";
import {
  bounceAnimation,
  charAnimation,
  fadeAnimation,
} from "@/utils/title-animation";
import HeroBannerTwo from "@/components/hero-banner/hero-banner-two";
import AboutOne from "@/components/about/about-one";
import { instagramAnim } from "@/utils/instagram-anim";
import FaqAreaTwo from "@/components/faq/faq-area-2";
import BlogOne from "@/components/blog/blog-one";
import FooterTwo from "@/layouts/footers/footer-two";

const HomeMain = () => {
  useScrollSmooth();
  useEffect(() => {
    document.body.classList.add("tp-magic-cursor");
    return () => {
      document.body.classList.remove("tp-magic-cursor");
    };
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      document.querySelector(".tp-magic-cursor")
    ) {
      cursorAnimation();
    }
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      videoAnimOne();
      // portfolio image wrap
      gsap.timeline({
        scrollTrigger: {
           trigger: ".tp-project-full-img-wrap",
           start: "top 65",
           end: "bottom 0%",
           pin: ".tp-project-full-img",
           pinSpacing: false,
        }
      });
      // team marquee
      teamMarqueAnim();
      hoverBtn();
      footerTwoAnimation();
      fadeAnimation();
      charAnimation();
      bounceAnimation();
      instagramAnim();
      hoverBtn();
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <Wrapper>
      {/* magic cursor start */}
      <div id="magic-cursor">
        <div id="ball"></div>
      </div>
      <HeaderOne transparent={true} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroBannerTwo />
            <ServiceOne />
            <AboutOne />
            <TeamOne />
            <VideOne />
            <div className="tp-brand-area">
              <div className="tp-brand-brd-top tp-brand-ptb">
                {/* Brand area spacing simulation */}
              </div>
            </div>
            <FaqAreaTwo />
            <BlogOne />
          </main>
          <FooterTwo />
        </div>
      </div>
    </Wrapper>
  );
};

export default HomeMain;
