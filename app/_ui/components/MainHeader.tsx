"use client";

import { Edit, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Logo from "./Logo";
import { useAuth } from "@/app/_hooks/useAuth";

export default function MainHeader() {
  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated);
  if (loading) {
    // Temporary measure - #TODO figure out how to load more elegantly?
    return <header className="h-16 py-2 border-b">
      <span className="invisible">Placeholder</span>
    </header>;
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
        <Button variant={"ghost"} size="icon" className="rounded-full">
          <Avatar className="border border-secondary">
            <AvatarImage src="/avatar_placeholder.png" alt="Profile picture" />
          </Avatar>
        </Button>
      </div>
    </header>
  );
}
