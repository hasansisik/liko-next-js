"use client";

import React from "react";
import BlogModernMain from "@/page-components/blog/blog-modern";
import SEOMetadata from "@/components/seo/seo-metadata";

const BlogModernPage = () => {
  return (
    <>
      <SEOMetadata 
        pageName="blog" 
        fallback={{
          title: "Liko - Blog",
          description: "Read our latest blog posts and insights",
          keywords: ["blog", "articles", "insights", "news"]
        }}
      />
      <BlogModernMain/>
    </>
  );
};

export default BlogModernPage;
