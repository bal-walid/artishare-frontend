"use client";
import { ArrowLeft, Settings, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { AuthGuard } from "../contexts/AuthContext";
import Logo from "../_ui/components/Logo";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <AuthGuard requireAuth={true}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar className="border-r">
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    size="lg"
                    onClick={() => router.push("/blogs")}
                  >
                    <div className="flex items-center justify-center gap-2 w-full">
                      <ArrowLeft className="h-4 w-4 text-main" />
                      <Logo className="text-main text-2xl " />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/profile"}
                        onClick={() => router.push("/profile")}
                      >
                        <button>
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/profile/settings"}
                        onClick={() => router.push("/profile/settings")}
                      >
                        <button>
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 overflow-auto flex flex-col">
            <div className="flex-1 ">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
