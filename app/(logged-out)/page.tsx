"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getService } from "@/redux/actions/serviceActions";
import { getAllServicePosts } from "@/redux/actions/servicePostActions";
import { getAllBlogPosts } from "@/redux/actions/blogPostActions";
import { getHome } from "@/redux/actions/homeActions";
import HomeOnePage from "@/app/(logged-out)/(homes)/home-1/page";
import SEOMetadata from "@/components/seo/seo-metadata";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { home, loading: homeLoading } = useAppSelector((state) => state.home);

  // Fetch all necessary data on component mount
  useEffect(() => {
    dispatch(getHome());
    dispatch(getService());
    dispatch(getAllServicePosts({ published: true, limit: 100 }));
    dispatch(getAllBlogPosts({ published: true, limit: 100 }));
  }, [dispatch]);

  return (
    <>
      <SEOMetadata 
        pageName="home" 
        fallback={{
          title: "Liko - Creative Agency & Portfolio",
          description: "Professional creative agency and portfolio website",
          keywords: ["creative", "agency", "portfolio", "design", "web development"]
        }}
      />
      <HomeOnePage />
    </>
  );
}
