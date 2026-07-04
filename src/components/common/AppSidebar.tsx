"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  LogOut,
  MessageSquareWarning,
  Podcast,
  Settings,
  User,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Admins",
    url: "/admins",
    icon: User,
  },
  {
    title: "Subscription",
    url: "/subscription",
    icon: Podcast,
  },
  {
    title: "Earnings",
    url: "/earnings",
    icon: Wallet,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: MessageSquareWarning,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <Sidebar 
      className="mt-0 ml-0 pb-7 md:mt-4 md:ml-4 md:mb-4 md:rounded-3xl border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.03)] bg-background/95 backdrop-blur-3xl overflow-hidden relative z-50 transition-all duration-500 ease-in-out h-[calc(100vh-2rem)]" 
      collapsible="icon"
    >
      {/* Decorative background glows */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[50px] translate-x-1/2 pointer-events-none" />

      {/* sidebar header */}
      <SidebarHeader className="flex flex-col items-center py-6 md:py-8 relative z-10 overflow-hidden">
        <div className="flex w-full flex-col items-center gap-2 md:gap-3">
          <div className="relative mt-2 flex h-24 w-40 items-center justify-center group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 md:mt-4 md:h-28 md:w-48 transition-all duration-500">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-150 animate-pulse group-data-[collapsible=icon]:hidden" />
            <img
              src="/logo.png"
              alt="Logo"
              className="h-full w-full object-contain relative z-10 drop-shadow-xl transition-all duration-300 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:scale-0 group-data-[collapsible=icon]:w-0"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/next.svg';
              }}
            />
            {/* Minimal Logo for Collapsed State */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-0 transition-all duration-300 group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:scale-100 bg-primary/10 rounded-full">
              <span className="text-xl font-bold text-primary">H</span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator className="mx-auto w-2/3 max-w-xs bg-gradient-to-r from-transparent via-border to-transparent opacity-50 relative z-10 mb-4 group-data-[collapsible=icon]:w-8" />

      <SidebarContent className="px-3 py-2 group-data-[collapsible=icon]:px-2 relative z-10 overflow-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3 group-data-[collapsible=icon]:items-center">
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title} className="group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                    <SidebarMenuButton
                      asChild
                      className="h-12 w-full p-0 md:h-14 bg-transparent hover:bg-transparent group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!p-0"
                      isActive={active}
                    >
                      <Link
                        href={item.url}
                        onClick={() => isMobile && setOpenMobile(false)}
                        className={`group relative flex h-full w-full items-center gap-4 overflow-hidden rounded-2xl px-5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:rounded-xl ${
                          active
                            ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.35)] scale-[1.02]"
                            : "text-muted-foreground hover:bg-primary/10 hover:text-primary hover:shadow-sm hover:scale-[1.02]"
                        }`}
                      >
                        <div className={`flex items-center justify-center p-2 rounded-xl transition-colors duration-300 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent ${active && !false ? "bg-primary-foreground/20" : "bg-transparent group-hover:bg-background shadow-sm group-hover:shadow-md group-data-[collapsible=icon]:shadow-none group-data-[collapsible=icon]:group-hover:bg-transparent"}`}>
                          <item.icon
                            className={`h-5 w-5 transition-transform duration-300 group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5 ${
                              active ? "scale-110 drop-shadow-md text-primary-foreground" : "group-hover:scale-110 text-muted-foreground group-hover:text-primary"
                            }`}
                          />
                        </div>
                        <span className="text-[15px] font-medium tracking-wide group-data-[collapsible=icon]:hidden md:text-base">
                          {item.title}
                        </span>
                        
                        {/* Active Indicator Dot */}
                        {active && (
                          <div className="absolute right-4 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary-foreground shadow-[0_0_8px_white] animate-pulse group-data-[collapsible=icon]:hidden" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* sidebar footer */}
      <SidebarFooter className="p-5 relative z-10 pb-8 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:pb-5">
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          <SidebarMenuItem className="group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
            <SidebarMenuButton
              asChild
              className="h-12 w-full p-0 md:h-14 bg-transparent hover:bg-transparent group-data-[collapsible=icon]:!w-10 group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!p-0"
            >
              <button
                onClick={() => setLogoutModalOpen(true)}
                className="group relative flex h-full w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-destructive/20 bg-destructive/5 px-4 text-destructive transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-destructive hover:bg-destructive hover:text-destructive-foreground hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-[1.02] group-data-[collapsible=icon]:px-0 md:gap-4 group-data-[collapsible=icon]:rounded-xl"
              >
                <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:scale-110 group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:group-hover:-translate-x-0 group-data-[collapsible=icon]:group-hover:scale-110" />
                <span className="text-[15px] font-semibold tracking-wide group-data-[collapsible=icon]:hidden md:text-base">
                  Sign Out
                </span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Logout Confirmation Modal */}
      <Dialog open={logoutModalOpen} onOpenChange={setLogoutModalOpen} modal={false}>
        <DialogContent className="bg-background sm:max-w-[400px] rounded-3xl overflow-hidden border-none shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-destructive to-transparent" />
          <DialogHeader className="space-y-4 pt-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 relative">
              <div className="absolute inset-0 rounded-full animate-ping bg-destructive/20 opacity-75" />
              <LogOut className="text-destructive h-8 w-8 relative z-10" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold tracking-tight">Confirm Sign Out</DialogTitle>
          </DialogHeader>

          <div className="py-2">
            <p className="text-muted-foreground text-center text-sm leading-relaxed">
              Are you sure you want to end your current session? You will be returned to the login screen.
            </p>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLogoutModalOpen(false)}
              className="flex-1 rounded-xl h-12 font-medium border-border/50 hover:bg-muted"
            >
              Cancel
            </Button>
            <Link href="/login" className="flex-1">
              <Button
                type="button"
                onClick={() => {
                  console.log("User logged out");
                  setLogoutModalOpen(false);
                }}
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl h-12 font-medium shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all hover:scale-[1.02]"
              >
                Sign Out
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
};

export default AppSidebar;
