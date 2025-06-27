"use client";

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getMyProfile } from "@/redux/actions/userActions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    // Get user profile if not already loaded
    if (!user || !user._id) {
      dispatch(getMyProfile());
    }
  }, [dispatch, user, router]);

  // Show loading while checking authentication
  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar 
        userData={{
          name: user?.name || "User",
          email: user?.email || "user@example.com",
          avatar: user?.profile?.picture || "/avatars/default.jpg"
        }}
      />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
