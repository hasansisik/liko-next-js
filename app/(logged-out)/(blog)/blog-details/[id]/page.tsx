import { Metadata } from "next";
import { blog_data } from "@/data/blog-data";
import BlogDetailsMain from "@/pages/blog/blog-details";

export const metadata: Metadata = {
  title: "Liko - Blog Details page",
};

export default async function BlogDetailsPage({params}:{params:Promise<{id:string}>}) {
  const { id } = await params;
  const blog = [...blog_data].find((blog) => blog.id === Number(id));
  return blog ? (
    <BlogDetailsMain blog={blog} />
  ) : (
    <div className="text-center pt-100">
      Blog not found with id: {id}
    </div>
  );
}
