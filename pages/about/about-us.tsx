"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { gsap } from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import AboutUsHero from "@/components/about/about-us-hero";
import AboutUsArea from "@/components/about/about-us-area";

// animation
import { charAnimation, fadeAnimation, titleAnimation } from "@/utils/title-animation";
import { hoverBtn } from "@/utils/hover-btn";
import { teamMarqueAnim } from "@/utils/scroll-marque";
import FooterTwo from "@/layouts/footers/footer-two";
import HeaderOne from "@/layouts/headers/header-one";

// Redux imports
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAbout } from "@/redux/actions/aboutActions";
import { footerData } from "@/data/footer-data";

const AboutUsMain = () => {
  const dispatch = useAppDispatch();
  const { about, loading, error } = useAppSelector((state) => state.about);
  
  useScrollSmooth();

  // Fetch about data on component mount
  React.useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      titleAnimation();
      teamMarqueAnim();
      fadeAnimation();
      hoverBtn();
    }, 100);
    return () => clearTimeout(timer);
  });

  // Show loading state
  if (loading) {
    return (
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Wrapper>
    );
  }

  // Show error state
  if (error) {
    return (
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </Wrapper>
    );
  }

  // Show content if about data is available
  if (!about) {
    return (
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="alert alert-warning" role="alert">
            About verisi bulunamadı.
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderOne transparent={true} color="white"/>
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* about hero */}
            <AboutUsHero heroData={about.hero} />

            <AboutUsArea aboutData={about.aboutInfo} />
            {/* about area */}
          </main>

          {/* footer area */}
          <FooterTwo footerData={footerData} />
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
};

export default AboutUsMain;
