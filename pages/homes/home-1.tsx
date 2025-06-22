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
import ServiceSix from "@/components/service/service-six";

import ProjectTwo from "@/components/project/project-two";

import TeamOne from "@/components/team/team-one";
import FooterOne from "@/layouts/footers/footer-one";

// images
import shape_1 from "@/assets/img/home-01/footer/footer-circle-shape-1.png";
import shape_2 from "@/assets/img/home-01/footer/footer-circle-shape-2.png";

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
import BlogClassicArea from "@/components/blog/blog-classic-area";
import BlogOne from "@/components/blog/blog-one";

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
      // portfolio image wrap
      gsap.timeline({
        scrollTrigger: {
          trigger: ".tp-project-full-img-wrap",
          start: "top 65",
          end: "bottom 0%",
          pin: ".tp-project-full-img",
          pinSpacing: false,
        },
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
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroBannerTwo />
            <HeroBannerOne />
            <ServiceOne />
            <AboutOne />
            <TeamOne />
            <FaqAreaTwo />
            <BlogOne />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default HomeMain;
