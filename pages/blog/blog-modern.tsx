"use client";
import { gsap } from "gsap";
import React, { useEffect } from "react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { getBlog } from '@/redux/actions/blogActions';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import FooterTwo from "@/layouts/footers/footer-two";
// animation
import { charAnimation } from "@/utils/title-animation";
import BlogModern from "@/components/blog/blog-modern-area";
import BigText from "@/components/big-text";
import HeaderOne from "@/layouts/headers/header-one";
import BlogHeroBanner from "@/components/blog/blog-hero-banner";

// fallback data import
import { blogModernData } from "@/data/blog-modern-data";

const BlogModernMain = () => {
  const dispatch = useDispatch();
  const { blog, loading, error } = useSelector((state: RootState) => state.blog);
  
  useScrollSmooth();

  // Fetch blog data on component mount
  useEffect(() => {
    dispatch(getBlog() as any);
  }, [dispatch]);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });

  // Use Redux data if available, otherwise fallback to static data
  const currentBlogData = blog || blogModernData;

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderOne transparent={true} color="white"/>
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* Loading state */}
            {loading && (
              <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                  <p className="text-red-600 mb-4">Error loading blog data: {error}</p>
                  <button 
                    onClick={() => dispatch(getBlog() as any)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Content */}
            {!loading && !error && (
              <>
                {/* blog hero banner start */}
                <BlogHeroBanner heroData={currentBlogData.hero} />
                {/* blog hero banner end */}

                {/* blog modern area start */}
                <BlogModern />
                {/* blog modern area end */}

                {/* big text area */}
                <BigText bigTextData={currentBlogData.bigText} />
                {/* big text area */}
              </>
            )}
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
