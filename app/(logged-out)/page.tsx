"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { getService } from "@/redux/actions/serviceActions";
import { getAllServicePosts } from "@/redux/actions/servicePostActions";
import { getAllBlogPosts } from "@/redux/actions/blogPostActions";
import HomeOnePage from "@/app/(logged-out)/(homes)/home-1/page";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Preload service and blog data for faster navigation
  useEffect(() => {
    dispatch(getService());
    dispatch(getAllServicePosts({ published: true, limit: 100 }));
    dispatch(getAllBlogPosts({ published: true, limit: 100 }));
  }, [dispatch]);

  return (
    <>
      <HomeOnePage />
    </>
  );
}
