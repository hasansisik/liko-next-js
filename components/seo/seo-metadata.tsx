"use client";

import { useEffect } from "react";
import Head from "next/head";
import { useSEO } from "@/hooks/use-seo";

interface SEOMetadataProps {
  pageName: string;
  companyId?: string;
  fallback?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

const SEOMetadata: React.FC<SEOMetadataProps> = ({ 
  pageName, 
  companyId = "default",
  fallback = {
    title: "Liko - Creative Agency & Portfolio",
    description: "Professional creative agency and portfolio website",
    keywords: ["creative", "agency", "portfolio", "design"]
  }
}) => {
  const { seoData, loading, error } = useSEO(pageName, companyId);

  useEffect(() => {
    if (seoData && !loading) {
      // Update document title
      document.title = seoData.title || fallback.title || "Liko";
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', seoData.description || fallback.description || "");
      } else {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.name = 'description';
        newMetaDescription.content = seoData.description || fallback.description || "";
        document.head.appendChild(newMetaDescription);
      }

      // Update meta keywords
      if (seoData.keywords && seoData.keywords.length > 0) {
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
          metaKeywords.setAttribute('content', seoData.keywords.join(', '));
        } else {
          const newMetaKeywords = document.createElement('meta');
          newMetaKeywords.name = 'keywords';
          newMetaKeywords.content = seoData.keywords.join(', ');
          document.head.appendChild(newMetaKeywords);
        }
      }

      // Update robots
      if (seoData.robots) {
        const metaRobots = document.querySelector('meta[name="robots"]');
        if (metaRobots) {
          metaRobots.setAttribute('content', seoData.robots);
        } else {
          const newMetaRobots = document.createElement('meta');
          newMetaRobots.name = 'robots';
          newMetaRobots.content = seoData.robots;
          document.head.appendChild(newMetaRobots);
        }
      }

      // Update canonical URL
      if (seoData.canonical) {
        const existingCanonical = document.querySelector('link[rel="canonical"]');
        if (existingCanonical) {
          existingCanonical.setAttribute('href', seoData.canonical);
        } else {
          const newCanonical = document.createElement('link');
          newCanonical.rel = 'canonical';
          newCanonical.href = seoData.canonical;
          document.head.appendChild(newCanonical);
        }
      }

      // Update Open Graph tags
      if (seoData.ogTitle) {
        updateOrCreateMetaTag('property', 'og:title', seoData.ogTitle);
      }
      if (seoData.ogDescription) {
        updateOrCreateMetaTag('property', 'og:description', seoData.ogDescription);
      }
      if (seoData.ogImage) {
        updateOrCreateMetaTag('property', 'og:image', seoData.ogImage);
      }
      if (seoData.ogUrl) {
        updateOrCreateMetaTag('property', 'og:url', seoData.ogUrl);
      }

      // Update Twitter tags
      if (seoData.twitterTitle) {
        updateOrCreateMetaTag('name', 'twitter:title', seoData.twitterTitle);
      }
      if (seoData.twitterDescription) {
        updateOrCreateMetaTag('name', 'twitter:description', seoData.twitterDescription);
      }
      if (seoData.twitterImage) {
        updateOrCreateMetaTag('name', 'twitter:image', seoData.twitterImage);
      }

      // Add structured data if available
      if (seoData.structuredData) {
        const existingStructuredData = document.querySelector('script[type="application/ld+json"]');
        if (existingStructuredData) {
          existingStructuredData.textContent = JSON.stringify(seoData.structuredData);
        } else {
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.textContent = JSON.stringify(seoData.structuredData);
          document.head.appendChild(script);
        }
      }
    }
  }, [seoData, loading, fallback]);

  const updateOrCreateMetaTag = (attribute: string, value: string, content: string) => {
    const selector = `meta[${attribute}="${value}"]`;
    const existingTag = document.querySelector(selector);
    if (existingTag) {
      existingTag.setAttribute('content', content);
    } else {
      const newTag = document.createElement('meta');
      newTag.setAttribute(attribute, value);
      newTag.setAttribute('content', content);
      document.head.appendChild(newTag);
    }
  };

  if (error) {
    console.warn('SEO data loading error:', error);
  }

  return null; // This component doesn't render anything visible
};

export default SEOMetadata; 