"use client";

import { useAuthContext } from "@/app/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, LogOut, Search, Settings, User, PenSquare } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Logo from "../Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainHeaderProps {
  blogsByQuery: (query: string) => void;
}

export default function MainHeader({ blogsByQuery }: MainHeaderProps) {
  const [query, setQuery] = useState<string>("");
  const { isAuthenticated } = useAuthContext();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const onChangefunction = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    blogsByQuery(e.target.value);
  };

  const handleLogOut = () => {
    // Implement logout logic here
    console.log("Logging out");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/40">
      <div className="h-16 flex items-center justify-between max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center transition-transform hover:scale-105"
          >
            <Logo className="text-primary text-3xl" />
          </Link>

          <div className="relative group">
            <div
              className={`absolute inset-0 bg-primary/5 rounded-full transition-all duration-300 ${
                isSearchFocused
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            />
            <div className="relative flex items-center">
              <Search
                className={`absolute left-3 h-4 w-4 transition-colors duration-200 ${
                  isSearchFocused ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <Input
                type="search"
                placeholder="Search articles..."
                className="w-[300px] pl-9 pr-4 h-10 bg-transparent border-none rounded-full transition-all duration-200
                         focus-visible:ring-1 focus-visible:ring-primary/20 focus-visible:bg-primary/5
                         placeholder:text-muted-foreground/70"
                value={query}
                onChange={onChangefunction}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hidden md:inline-flex items-center gap-2 hover:bg-primary/5 transition-colors"
          >
            <PenSquare className="h-4 w-4" />
            <span>Write</span>
          </Button>

          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="text-sm font-medium hover:bg-primary/5"
              >
                Sign in
              </Button>
              <Button className="text-sm font-medium px-6 shadow-sm hover:shadow-md transition-shadow">
                Get started
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-10 w-10 p-0.5 hover:bg-primary/5 transition-colors"
                >
                  <Avatar className="h-full w-full border-2 border-border hover:border-primary/20 transition-colors">
                    <AvatarImage
                      src="/avatar_placeholder.png"
                      alt="Profile picture"
                    />
                    <AvatarFallback className="bg-primary/5 text-sm font-medium">
                      UN
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 p-2"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuLabel className="font-normal p-2">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-semibold">Username</p>
                    <p className="text-xs text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center cursor-pointer p-2 rounded-md"
                    >
                      <User className="mr-3 h-4 w-4" />
                      <span>View profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center cursor-pointer p-2 rounded-md"
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem
                  onClick={handleLogOut}
                  className="p-2 rounded-md text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
