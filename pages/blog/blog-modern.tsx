"use client";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { gsap } from "gsap";
import React, { useEffect } from "react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getAllBlogPosts } from '@/redux/actions/blogPostActions';
import { formatBlogDate } from '@/utils/date-utils';
import useMobile from "@/hooks/use-mobile";
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
  const isMobile = useMobile();
  
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
          <main style={{ overflow: 'hidden' }}>
            {/* Loading state */}
            {loading && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: isMobile ? '50vh' : '100vh',
                padding: isMobile ? '40px 0' : '0'
              }}>
                <div style={{ 
                  width: isMobile ? '40px' : '80px', 
                  height: isMobile ? '40px' : '80px', 
                  borderRadius: '50%', 
                  border: '2px solid #f3f3f3', 
                  borderTop: '2px solid #3498db', 
                  animation: 'spin 1s linear infinite'
                }}></div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: isMobile ? '50vh' : '100vh',
                padding: isMobile ? '40px 20px' : '0'
              }}>
                <div className="text-center">
                  <p style={{ color: '#e74c3c', marginBottom: '1rem' }}>
                    Error loading blog data: {error}
                  </p>
                  <button 
                    onClick={() => dispatch(getAllBlogPosts({ published: true, limit: 100 }))}
                    style={{ 
                      padding: '0.5rem 1rem', 
                      backgroundColor: '#3498db', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '0.25rem', 
                      cursor: 'pointer' 
                    }}
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
