// Force dynamic rendering
export const dynamic = 'force-dynamic';
import React from "react";
import { Metadata } from "next";
import SearchResults from "@/pages/blog/search";

export const metadata: Metadata = {
  title: "Liko Dental - Search Results",
  description: "Search results for blog posts - Liko Dental Practice"
};

interface SearchPageProps {
  searchParams: Promise<{ q: string }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = await searchParams;
  
  return (
    <SearchResults searchQuery={q} />
  );
};

export default SearchPage; 