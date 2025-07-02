import React from "react";
import { Metadata } from "next";
import BlogModernMain from "@/page-components/blog/blog-modern";

export const metadata: Metadata = {
  title: "Liko - Blog Modern page",
};

const BlogModernPage = () => {
  return (
    <BlogModernMain/>
  );
};

export default BlogModernPage;
