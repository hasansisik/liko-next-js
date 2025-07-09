"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  SquareTerminal,
  Search,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Pages",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/dashboard/home",
        },
        {
          title: "Services",
          url: "/dashboard/services",
        },
        {
          title: "Blog",
          url: "/dashboard/blog",
        },
        {
          title: "Contact",
          url: "/dashboard/contact",
        },
        {
          title: "About",
          url: "/dashboard/about",
        },
        {
          title: "Policies",
          url: "/dashboard/policies",
        },
      ],
    },
    {
      title: "Components",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Header",
          url: "/dashboard/header",
        },
        {
          title: "Footer",
          url: "/dashboard/footer",
        },
        {
          title: "Form",
          url: "/dashboard/form",
        },
        {
          title: "Form Submissions",
          url: "/dashboard/form-submissions",
        }
       
      ],
    },
    {
      title: "Blog Management",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Blog Posts",
          url: "/dashboard/blog-posts",
        },
        {
          title: "Service Posts",
          url: "/dashboard/service-posts",
        },
        {
          title: "Comments",
          url: "/dashboard/comments",
        },
       
      ],
    },
    {
      title: "SEO Management",
      url: "#",
      icon: Search,
      isActive: true,
      items: [
        {
          title: "SEO Settings",
          url: "/dashboard/seo",
        },
       
      ],
    }
  ]
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userData?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function AppSidebar({ userData, ...props }: AppSidebarProps) {
  const defaultUser = {
    name: userData?.name || "User",
    email: userData?.email || "user@example.com",
    avatar: userData?.avatar || "/avatars/default.jpg",
  };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  B
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Dashboard</span>
                  <span className="truncate text-xs">Birim Ajans</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={defaultUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
