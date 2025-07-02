"use client";
import { gsap } from "gsap";
import React, { useEffect, useState } from "react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getAllBlogPosts } from '@/redux/actions/blogPostActions';
import Link from "next/link";
import useMobile from "@/hooks/use-mobile";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderEleven from "@/layouts/headers/header-eleven";
import BlogListArea from "@/components/blog/blog-list-area";
import BigText from "@/components/big-text";
import FooterTwo from "@/layouts/footers/footer-two";
// animation
import { charAnimation, zoomAnimation } from "@/utils/title-animation";
import HeaderOne from "@/layouts/headers/header-one";

interface CategoryMainProps {
  categorySlug: string;
}

const CategoryMain: React.FC<CategoryMainProps> = ({ categorySlug }) => {
  const dispatch = useAppDispatch();
  const { blogPosts, loading, error } = useAppSelector((state) => state.blogPosts);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const isMobile = useMobile();
  
  useScrollSmooth();

  // Fetch blog posts on component mount
  useEffect(() => {
    dispatch(getAllBlogPosts({ 
      published: true,
      limit: 100
    }));
  }, [dispatch]);

  // Filter posts by category when blogPosts or categorySlug changes
  useEffect(() => {
    if (blogPosts.length > 0 && categorySlug) {
      // Decode the category slug
      const decodedSlug = decodeURIComponent(categorySlug);
      
      // Filter posts that have this category
      const filtered = blogPosts.filter(post => 
        post.categories && post.categories.some((cat: string) => 
          cat.toLowerCase().replace(/\s+/g, '-') === decodedSlug.toLowerCase() ||
          cat.toLowerCase() === decodedSlug.toLowerCase()
        )
      );
      
      setFilteredPosts(filtered);
      
      // Set category name from the first matching post
      if (filtered.length > 0) {
        const matchingCategory = filtered[0].categories?.find((cat: string) => 
          cat.toLowerCase().replace(/\s+/g, '-') === decodedSlug.toLowerCase() ||
          cat.toLowerCase() === decodedSlug.toLowerCase()
        );
        setCategoryName(matchingCategory || decodedSlug);
      } else {
        setCategoryName(decodedSlug);
      }
    }
  }, [blogPosts, categorySlug]);

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      zoomAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderOne transparent={true} color="black"/>
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Category Banner */}
            <div className="tm-hero-area tm-hero-ptb p-relative" style={{ 
              minHeight: isMobile ? '450px' : '600px', 
              marginBottom: '0' 
            }}>
              <div 
                className="tm-hero-bg"
                style={{
                  backgroundImage: "url(/assets/img/hero/hero-2.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              ></div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="tm-hero-content text-center">
                      <span className="tm-hero-subtitle" style={{ 
                        fontSize: isMobile ? '14px' : '18px', 
                        marginBottom: isMobile ? '20px' : '20px', 
                        display: 'block' 
                      }}>
                        Blog Category
                      </span>
                      <h1 
                        className="tm-hero-title-big tp-char-animation" 
                        style={{ 
                          fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(3rem, 10vw, 8rem)', 
                          lineHeight: '1.2', 
                          marginBottom: isMobile ? '25px' : '30px',
                          maxWidth: '90%',
                          margin: isMobile ? '0 auto 25px' : '0 auto 30px',
                          wordBreak: 'break-word',
                          letterSpacing: isMobile ? '0.5px' : 'normal'
                        }}
                      >
                        {categoryName || 'Category'}
                      </h1>
                      <p 
                        className="tm-hero-desc" 
                        style={{ 
                          fontSize: isMobile ? '16px' : '20px', 
                          marginBottom: '0',
                          maxWidth: isMobile ? '100%' : '600px',
                          margin: '0 auto',
                          fontWeight: '500',
                          lineHeight: isMobile ? '1.5' : 'inherit'
                        }}
                      >
                        {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found in this category
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Info Section */}
            {!loading && !error && (
              <div className="container" style={{ 
                marginTop: isMobile ? '30px' : '40px', 
                marginBottom: isMobile ? '20px' : '20px' 
              }}>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="text-center py-4 border-bottom" style={{ 
                      padding: isMobile ? '20px 0' : undefined 
                    }}>
                      <h3 className="mb-2" style={{ 
                        fontSize: isMobile ? '18px' : '24px',
                        marginBottom: isMobile ? '15px' : '8px' 
                      }}>
                        &ldquo;{categoryName}&rdquo; Kategorisi
                      </h3>
                      <p className="text-muted mb-0" style={{ 
                        fontSize: isMobile ? '14px' : '16px',
                        lineHeight: isMobile ? '1.5' : 'inherit'
                      }}>
                        Bu kategoride toplam <strong>{filteredPosts.length} makale</strong> bulunmaktadır.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #f3f3f3', borderTop: '2px solid #3498db', animation: 'spin 1s linear infinite' }}></div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div className="text-center">
                  <p style={{ color: '#e74c3c', marginBottom: '1rem' }}>Error loading blog posts: {error}</p>
                  <button 
                    onClick={() => dispatch(getAllBlogPosts({ published: true, limit: 100 }))}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* No posts found */}
            {!loading && !error && filteredPosts.length === 0 && (
              <div className="container" style={{ padding: '5rem 0' }}>
                <div className="text-center">
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>No Posts Found</h2>
                  <p style={{ color: '#666', marginBottom: '2rem' }}>
                    Sorry, we couldn&apos;t find any posts in the &ldquo;{categoryName}&rdquo; category.
                  </p>
                  <Link 
                    href="/blog" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      padding: '0.75rem 1.5rem', 
                      backgroundColor: '#3498db', 
                      color: 'white', 
                      borderRadius: '0.5rem', 
                      textDecoration: 'none',
                      transition: 'background-color 0.3s'
                    }}
                  >
                    Back to All Posts
                  </Link>
                </div>
              </div>
            )}

            {/* Blog list area with filtered posts */}
            {!loading && !error && filteredPosts.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <BlogListArea blogPosts={filteredPosts} />
              </div>
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

export default CategoryMain; 