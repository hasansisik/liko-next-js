"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllBlogPosts } from "@/redux/actions/blogPostActions";
import { getAllServicePosts } from "@/redux/actions/servicePostActions";
import { getAllService } from "@/redux/actions/serviceActions";
import BlogDetailsMain from "@/pages/blog/blog-details";
import ServiceDetailsMain from "@/pages/service/service-details";
import { IBlogDT } from "@/types/blog-d-t";
import { IServiceDT } from "@/types/service-d-t";
import { BlogPostData } from "@/redux/actions/blogPostActions";
import { ServicePostData } from "@/redux/actions/servicePostActions";
import { ServiceData } from "@/redux/actions/serviceActions";
import { formatBlogDate } from "@/utils/date-utils";

const UnifiedContentPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  
  const dispatch = useAppDispatch();
  const { blogPosts, loading: blogLoading } = useAppSelector((state) => state.blogPosts);
  const { servicePosts, loading: servicePostLoading } = useAppSelector((state) => state.servicePosts);
  const { services, loading: serviceLoading } = useAppSelector((state) => state.service);
  
  const [content, setContent] = useState<
  | { type: 'blog'; content: IBlogDT }
    | { type: 'servicePost'; content: IServiceDT }
  | { type: 'service'; content: IServiceDT }
    | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transform BlogPost to IBlogDT
  const transformBlogPost = (post: BlogPostData): IBlogDT => ({
    id: parseInt(post._id?.slice(-6) || "1", 16),
    img: post.img as any,
    title: post.title,
    date: formatBlogDate(post.date || post.createdAt),
    category: post.categories?.[0] || 'General',
    author: post.author || 'Admin',
    desc: post.desc,
    commentCount: post.commentCount || 0,
    comments: post.comments?.map((comment, index) => ({
      id: index + 1,
      name: comment.name,
      avatar: comment.avatar || "/assets/img/inner-blog/blog-details/avatar/avatar-3.jpg",
      date: comment.date,
      comment: comment.comment
    })) || [],
    content: post.content,
    video: post.video,
    videoId: post.videoId,
    avatar: post.avatar as any,
    blogQuote: post.blogQuote,
    imgSlider: post.imgSlider,
    blogQuoteTwo: post.blogQuoteTwo,
    blogHeroSlider: post.blogHeroSlider,
    images: post.images as any
  });

  // Transform ServicePost to IServiceDT
  const transformServicePost = (post: ServicePostData): IServiceDT => ({
    id: parseInt(post._id?.slice(-6) || "1", 16),
    img: post.img || "/assets/img/service/service-1.jpg",
    title: post.title,
    category: post.categories?.[0] || 'Service',
    desc: post.desc || "",
    content: {
      htmlContent: typeof post.content === 'string' 
        ? post.content 
        : post.content?.htmlContent || `<div>${post.desc || ""}</div>`
    },
    features: post.tags || []
  });

  // Transform ServiceData to IServiceDT (basic mapping)
  const transformService = (service: ServiceData): IServiceDT => ({
    id: parseInt(service._id?.slice(-6) || "1", 16),
    img: service.hero?.image || "/assets/img/service/service-1.jpg",
    title: service.hero?.title || "Service",
    category: "Service",
    desc: service.hero?.description || "Service description",
    content: {
      htmlContent: `
        <div class="service-details-top-text">
          <p>${service.hero?.description || "Service description"}</p>
        </div>
        <div class="service-details-section">
          <h4 class="service-details-title">${service.serviceSection?.title || "Service Details"}</h4>
          <p>${service.serviceSection?.subtitle || "Service subtitle"}</p>
        </div>
      `
    }
  });

  // Helper function to create slug from title
  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Find content by slug
  const findContentBySlug = (slug: string) => {
    console.log(`Finding content for slug: ${slug}`);
    
    // Check blog posts
    const blogPost = blogPosts.find(post => 
      post.slug === slug || createSlug(post.title) === slug
    );
    if (blogPost) {
      console.log(`Found matching blog post: ${blogPost.title}`);
      return { type: 'blog' as const, content: transformBlogPost(blogPost) };
    }

    // Check service posts
    const servicePost = servicePosts.find(post => 
      post.slug === slug || createSlug(post.title) === slug
    );
    if (servicePost) {
      console.log(`Found matching service post: ${servicePost.title}`);
      const transformedService = transformServicePost(servicePost);
      console.log("Transformed service post:", transformedService);
      return { type: 'servicePost' as const, content: transformedService };
    }

    // Check services (using title-based slug since services might not have slug field)
    const service = services.find(service => 
      createSlug(service.hero?.title || '') === slug
    );
    if (service) {
      console.log(`Found matching service: ${service.hero?.title}`);
      const transformedService = transformService(service);
      console.log("Transformed service:", transformedService);
      return { type: 'service' as const, content: transformedService };
    }

    console.log(`No matching content found for slug: ${slug}`);
    return null;
  };

  // Load data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (blogPosts.length === 0) {
          await dispatch(getAllBlogPosts({ published: true, limit: 100 }));
        }
        
        if (servicePosts.length === 0) {
          await dispatch(getAllServicePosts({ published: true, limit: 100 }));
        }
        
        if (services.length === 0) {
          await dispatch(getAllService());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load content");
        setLoading(false);
      }
    };
    
    fetchData();
  }, [dispatch, blogPosts.length, servicePosts.length, services.length]);

  // Find content when data is loaded
  useEffect(() => {
    if (!blogLoading && !servicePostLoading && !serviceLoading) {
      const foundContent = findContentBySlug(slug);
      
      if (foundContent) {
        setContent(foundContent);
        setError(null);
      } else {
        setError("Content not found");
      }
      
      setLoading(false);
    }
  }, [blogPosts, servicePosts, services, blogLoading, servicePostLoading, serviceLoading, slug]);

  // Loading state
  if (loading || blogLoading || servicePostLoading || serviceLoading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-3">Loading content...</p>
      </div>
    );
  }

  // Error state
  if (error || !content) {
    return (
      <div className="container text-center py-5">
        <h1>Content Not Found</h1>
        <p>The content you&apos;re looking for doesn&apos;t exist.</p>
        <p className="text-muted">Slug: {slug}</p>
      </div>
    );
  }

  // Render appropriate component based on content type
  if (content.type === 'blog') {
    return <BlogDetailsMain blog={content.content} />;
  } else if (content.type === 'servicePost' || content.type === 'service') {
    return <ServiceDetailsMain service={content.content} />;
  } else {
    // This case should never happen due to our type system, but TypeScript requires it
    return null;
  }
};

export default UnifiedContentPage; 