import { Metadata } from "next";
import { blog_data } from "@/data/blog-data";
import BlogDetailsMain from "@/pages/blog/blog-details";
import { findBlogBySlug, createSlug } from "@/utils/slug-utils";

export const metadata: Metadata = {
  title: "Liko - Blog Details page",
};

export default async function BlogDetailsPage({params}:{params:Promise<{slug:string}>}) {
  const { slug } = await params;
  const blog = findBlogBySlug(blog_data, slug);
  
  return blog ? (
    <BlogDetailsMain blog={blog} />
  ) : (
    <div className="text-center pt-100">
      Blog not found with slug: {slug}
    </div>
  );
}

// generateStaticParams fonksiyonu ile tüm blog sluglarını önceden oluştur
export async function generateStaticParams() {
  return blog_data.map((blog) => ({
    slug: createSlug(blog.title),
  }));
}
