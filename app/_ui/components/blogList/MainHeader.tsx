"use client";

import { Edit, Search, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "../Logo";
import { useAuth } from "@/app/_hooks/useAuth";

export default function MainHeader() {
  const { isAuthenticated, loading } = useAuth();

  const handleLogOut = () => {
    // Implement logout logic here
    console.log("Logging out");
  };

  if (loading) {
    return (
      <header className="h-16 py-2 border-b">
        <span className="invisible">Placeholder</span>
      </header>
    );
  }

  return (
    <header className="h-16 flex items-center justify-between border-b py-2 px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Logo className={"text-main bg-white text-3xl"} />
        </Link>
        <div className="flex relative">
          <Input
            type="search"
            placeholder="Search"
            className="peer w-[240px] pl-8 bg-muted/50 shadow-none border-none focus-visible:ring-0 rounded-full font-semibold placeholder:text-gray-700 placeholder:font-semibold"
          />
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-700 peer-focus:text-black" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant={"mediumLike"} className="font-normal">
          <Edit strokeWidth={1} className="!w-5 !h-5" />
          <span className="ml-1">Write</span>
        </Button>
        {!isAuthenticated && (
          <>
            <Button className="rounded-full font-normal shadow-none text-xs">
              Sign Up
            </Button>
            <Button variant={"mediumLike"}>Sign in</Button>
          </>
        )}
        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size="icon" className="rounded-full">
                <Avatar className="border border-secondary">
                  <AvatarImage
                    src="/avatar_placeholder.png"
                    alt="Profile picture"
                  />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">username</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
