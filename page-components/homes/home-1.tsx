"use client";
import { gsap } from "gsap";
import React, { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { getHome } from '@/redux/actions/homeActions';
import { getAllServicePosts } from '@/redux/actions/servicePostActions';
import {
  ScrollTrigger,
  SplitText,
  cursorAnimation,
} from "@/plugins";
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/header-one";

import ServiceOne from "@/components/service/service-one";
import VideOne from "@/components/video/video-one";
import TeamOne from "@/components/team/team-one";


// animation
// import { videoAnimOne } from "@/utils/video-anim";
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
  const dispatch = useDispatch();
  const { home, loading, error } = useSelector((state: RootState) => state.home);
  const { servicePosts, loading: servicePostsLoading } = useSelector((state: RootState) => state.servicePosts);
  
  // Fetch home data and service posts on component mount
  useEffect(() => {
    dispatch(getHome() as any);
    dispatch(getAllServicePosts({ published: true, limit: 100 }) as any);
  }, [dispatch]);

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
    // Only initialize animations if we have home data from Redux
    if (home && !loading) {
      const timer = setTimeout(() => {
        // Clear any existing ScrollTriggers
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        
        // Removed videoAnimOne() to fix video stuttering during scroll
        
        // portfolio image wrap - check if elements exist first
        const projectImgWrap = document.querySelector(".tp-project-full-img-wrap");
        const projectImg = document.querySelector(".tp-project-full-img");
        
        if (projectImgWrap && projectImg) {
          gsap.timeline({
            scrollTrigger: {
               trigger: ".tp-project-full-img-wrap",
               start: "top 65",
               end: "bottom 0%",
               pin: ".tp-project-full-img",
               pinSpacing: false,
            }
          });
        }
        
        // team marquee
        teamMarqueAnim();
        hoverBtn();
        footerTwoAnimation();
        fadeAnimation();
        charAnimation();
        bounceAnimation();
        instagramAnim();
        hoverBtn();
        
        // Refresh ScrollTrigger after all animations are set up
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [home, loading]); // Re-run when home data changes or loading state changes

  // Show loading state
  if (loading || !home) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading home data: {error}</p>
          <button 
            onClick={() => dispatch(getHome() as any)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Wrapper>
      {/* magic cursor start */}
      <div id="magic-cursor">
        <div id="ball"></div>
      </div>
      <HeaderOne transparent={true} />
      <main>
        <HeroBannerTwo heroData={home.heroBanner} />
        <ServiceOne serviceData={home.serviceSection} servicePosts={servicePosts} />
        <AboutOne aboutData={home.aboutSection} />
        <TeamOne teamData={home.teamSection} />
        <VideOne videoData={home.videoSection} />
        <FaqAreaTwo faqData={home.faqSection} />
        <BlogOne />
      </main>
      <FooterTwo />
    </Wrapper>
  );
};

export default HomeMain;
