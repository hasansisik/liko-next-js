"use client";

import React from "react";
import { useParams } from "next/navigation";
import CategoryMain from "@/page-components/blog/category";
import SEOMetadata from "@/components/seo/seo-metadata";

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  
  return (
    <>
      <SEOMetadata 
        pageName="blog" 
        fallback={{
          title: `Liko - Blog Category: ${slug}`,
          description: `Browse blog posts in the ${slug} category`,
          keywords: ["blog", "category", slug, "articles"]
        }}
      />
      <CategoryMain categorySlug={slug} />
    </>
  );
};

export default CategoryPage; 