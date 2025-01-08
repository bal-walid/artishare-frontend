"use client";

import { useAuthContext } from "@/app/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  LogOut,
  PenSquare,
  Search,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Logo from "../Logo";
import { serverAddress } from "@/app/_config/main";

interface HeaderProps {
  blogsByQuery?: (query: string) => void;
  isSearchPage?: boolean;
  initialQuery?: string;
  isEditMode?: boolean;
  onPublish?: () => void;
}

export default function Header({
  blogsByQuery,
  isSearchPage = false,
  initialQuery = "",
  isEditMode = false,
  onPublish,
}: HeaderProps) {
  const { user } = useAuthContext();
  const [query, setQuery] = useState<string>(initialQuery);
  const { isAuthenticated, logout } = useAuthContext();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();
  
  const onChangefunction = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/blogs?query=${encodeURIComponent(query.trim())}`);
    }
  };
  const handleSubmit = () => {
    if (!isSearchPage) {
      handleSearch();
    } else {
      blogsByQuery?.(query);
    }
  };

  const handleLogOut = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/40 ${
        isEditMode ? "fixed w-full" : ""
      }`}
    >
      <div
        className={`h-16 flex items-center justify-between mx-auto px-4 lg:px-8 ${
          isEditMode ? "max-w-[1032px]" : "max-w-7xl"
        }`}
      >
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center transition-transform hover:scale-105"
          >
            <Logo
              className={`${
                isEditMode
                  ? "text-main bg-white text-4xl"
                  : "text-primary text-3xl"
              }`}
            />
          </Link>

          {!isEditMode && (
            <div className="relative group flex items-center gap-2">
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
                  className="w-[300px] pl-9 pr-4 h-10 bg-transparent rounded-full transition-all duration-200 focus-visible:bg-primary/5 placeholder:text-muted-foreground/70 [&::-webkit-search-cancel-button]:hidden"
                  value={query}
                  onChange={onChangefunction}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-[40px] px-5 absolute top-0 right-0 w-fit bg-main rounded-full hover:bg-main/50"
                onClick={() => handleSubmit()}
              >
                <span className="text-white">Search</span>
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isEditMode ? (
            <>
              <Button
                className="p-0 rounded-full py-1 px-3 text-sm h-auto font-normal"
                variant="success"
                onClick={onPublish}
              >
                Publish
              </Button>
              <Button className="w-auto h-auto p-0" variant="mediumLike">
                <HelpCircle strokeWidth={2} className="!h-6 !w-6" />
              </Button>
            </>
          ) : (
            <Link href="/create">
              <Button variant="mediumLike" className="font-normal">
                <PenSquare strokeWidth={1} className="!w-5 !h-5" />
                <span className="ml-1">Write</span>
              </Button>
            </Link>
          )}

          {!isAuthenticated && !isEditMode && (
            <>
              <Button className="rounded-full font-normal shadow-none text-xs">
                Sign Up
              </Button>
              <Button variant="mediumLike">Sign in</Button>
            </>
          )}

          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-10 w-10 p-0.5 hover:bg-primary/5 transition-colors"
                >
                  <Avatar
                    className={`h-full w-full border-2 ${
                      isEditMode
                        ? "border-secondary"
                        : "border-border hover:border-main/50"
                    } transition-colors`}
                  >
                    <AvatarImage
                      src={serverAddress + user?.profile_image}
                      alt={user?.first_name}
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
                    <p className="text-sm font-semibold">
                      {user?.first_name}
                      {user?.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
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
                      href="/profile/settings"
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
