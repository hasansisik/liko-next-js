"use client";
import { gsap } from "gsap";
import React from "react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import { IBlogDT } from "@/types/blog-d-t";
import BlogDetailsArea from "@/components/blog/details/blog-details-area";
import BlogDetailsBreadcrumb from "@/components/blog/details/blog-details-breadcrumb";
import BlogDetailsRelatedPosts from "@/components/blog/details/blog-details-related-posts";
// animation
import { charAnimation } from "@/utils/title-animation";
import HeaderOne from "@/layouts/headers/header-one";
import FooterTwo from "@/layouts/footers/footer-two";

// prop type
type IProps = {
  blog: IBlogDT;
};

const BlogDetailsMain = ({ blog }: IProps) => {
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
            {/* blog details hero */}
            <BlogDetailsBreadcrumb blog={blog} />
            {/* blog details hero */}

            {/* blog details area */}
            <BlogDetailsArea blog={blog} />
            {/* blog details area */}

            {/* related posts */}
            <BlogDetailsRelatedPosts/>
            {/* related posts */}

          </main>

          {/* footer area */}
          <FooterTwo topCls="" />
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
};

export default BlogDetailsMain;
