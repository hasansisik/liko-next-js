// Force dynamic rendering
export const dynamic = 'force-dynamic';
import React from "react";
import { Metadata } from "next";
import CategoryMain from "@/pages/blog/category";

export const metadata: Metadata = {
  title: "Liko Dental - Blog Category",
  description: "Browse blog posts by category - Liko Dental Practice"
};

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  
  return (
    <CategoryMain categorySlug={slug} />
  );
};

export default CategoryPage; 