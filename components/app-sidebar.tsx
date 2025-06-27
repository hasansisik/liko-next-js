"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
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
          url: "#",
        },
        {
          title: "Services",
          url: "#",
        },
        {
          title: "Blog",
          url: "#",
        },
        {
          title: "Contact",
          url: "#",
        },
        {
          title: "About",
          url: "/dashboard/about",
        },
        
      ],
    },
    {
      title: "Editor",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "About",
          url: "/dashboard/about",
        },
        {
          title: "Blog",
          url: "#",
        },
        {
          title: "Services",
          url: "#",
        },
       
      ],
    },
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
