import { Metadata } from "next";
import { blog_data } from "@/data/blog-data";
import { service_data } from "@/data/service-data";
import BlogDetailsMain from "@/pages/blog/blog-details";
import ServiceDetailsMain from "@/pages/service/service-details";
import { createSlug } from "@/utils/slug-utils";
import { IBlogDT } from "@/types/blog-d-t";
import { IServiceDT } from "@/types/service-d-t";

type Props = {
  params: Promise<{ slug: string }>;
};

// Helper function to find content by slug
function findContentBySlug(slug: string): 
  | { type: 'blog'; content: IBlogDT }
  | { type: 'service'; content: IServiceDT }
  | null {
  // First try to find in blog data
  const blog = blog_data.find(item => createSlug(item.title) === slug);
  if (blog) {
    return { type: 'blog' as const, content: blog };
  }

  // Then try to find in service data
  const service = service_data.find(item => createSlug(item.title) === slug);
  if (service) {
    return { type: 'service' as const, content: service };
  }

  return null;
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = findContentBySlug(slug);

  if (!result) {
    return {
      title: "Content Not Found - Liko",
    };
  }

  const { type, content } = result;
  
  if (type === 'blog') {
    return {
      title: `${content.title} - Liko Blog`,
      description: content.desc,
    };
  } else {
    return {
      title: `${content.title} - Liko Services`,
      description: content.desc,
    };
  }
}

// Generate static params for all content
export async function generateStaticParams() {
  const blogSlugs = blog_data.map((blog) => ({
    slug: createSlug(blog.title),
  }));

  const serviceSlugs = service_data.map((service) => ({
    slug: createSlug(service.title),
  }));

  return [...blogSlugs, ...serviceSlugs];
}

const UnifiedContentPage = async ({ params }: Props) => {
  const { slug } = await params;
  const result = findContentBySlug(slug);

  if (!result) {
    return (
      <div className="container text-center py-5">
        <h1>Content Not Found</h1>
        <p>The content you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  const { type, content } = result;

  // Render appropriate component based on content type
  if (type === 'blog') {
    return <BlogDetailsMain blog={content} />;
  } else {
    return <ServiceDetailsMain service={content} />;
  }
};

export default UnifiedContentPage; 