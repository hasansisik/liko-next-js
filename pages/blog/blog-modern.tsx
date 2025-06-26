"use client";
import { gsap } from "gsap";
import React from "react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderEleven from "@/layouts/headers/header-eleven";
import FooterTwo from "@/layouts/footers/footer-two";
// animation
import { charAnimation } from "@/utils/title-animation";
import BlogModern from "@/components/blog/blog-modern-area";
import BigText from "@/components/big-text";
import HeaderOne from "@/layouts/headers/header-one";
import BlogHeroBanner from "@/components/blog/blog-hero-banner";

// data import
import { blogModernData } from "@/data/blog-modern-data";

const BlogModernMain = () => {
  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderOne transparent={true} color="white"/>
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* blog hero banner start */}
            <BlogHeroBanner heroData={blogModernData.hero} />
            {/* blog hero banner end */}

            {/* blog modern area start */}
            <BlogModern />
            {/* blog modern area end */}

            {/* big text area */}
            <BigText bigTextData={blogModernData.bigText} />
            {/* big text area */}
          </main>

          {/* footer area */}
          <FooterTwo topCls="" />
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
};

export default BlogModernMain;
