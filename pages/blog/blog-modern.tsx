"use client";
import { gsap } from "gsap";
import React, { useEffect } from "react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getAllBlogPosts } from '@/redux/actions/blogPostActions';
import { formatBlogDate } from '@/utils/date-utils';
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
  const dispatch = useAppDispatch();
  const { blogPosts, loading, error } = useAppSelector((state) => state.blogPosts);
  
  useScrollSmooth();

  // Fetch blog data on component mount
  useEffect(() => {
    dispatch(getAllBlogPosts({ 
      published: true, // Only get published posts for public view
      limit: 100 // Get more posts to ensure we have enough data
    }));
  }, [dispatch]);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });

  // Use blog posts data if available, otherwise fallback to static data
  const currentBlogData = blogPosts.length > 0 ? {
    ...blogModernData,
    posts: blogPosts.map(post => ({
      id: parseInt(post._id?.slice(-6) || "1", 16), // Convert ObjectId to number
      img: post.img,
      title: post.title,
      date: formatBlogDate(post.date || post.createdAt),
      category: post.categories?.[0] || 'General',
      author: post.author || 'Admin',
      desc: post.desc,
      commentCount: post.commentCount || 0,
      comments: post.comments || [],
      content: post.content,
      video: post.video,
      videoId: post.videoId,
      blogQuote: post.blogQuote,
      imgSlider: post.imgSlider,
      blogQuoteTwo: post.blogQuoteTwo,
      blogHeroSlider: post.blogHeroSlider,
      images: post.images,
      avatar: post.avatar,
      isPublished: post.isPublished,
      tags: post.tags,
      slug: post.slug || post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    }))
  } : blogModernData;

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
                    onClick={() => dispatch(getAllBlogPosts({ published: true, limit: 100 }))}
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
                <BlogModern blogPosts={blogPosts} />
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
