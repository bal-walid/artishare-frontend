import { Bell, Edit, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "./Logo";

export default function MainHeader() {
  return (
    <header className="flex items-center justify-between border-b py-2 px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Logo className={"text-main bg-white text-3xl"} />
        </Link>
        <div className="hidden md:flex relative max-w-md">
          <Input
            type="search"
            placeholder="Search"
            className="peer w-[240px] pl-8 bg-muted/50 shadow-none border-none focus-visible:ring-0 rounded-full font-semibold placeholder:text-gray-700 placeholder:font-semibold"
          />
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-700 peer-focus:text-black" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Edit className="h-5 w-5" />
          <span className="ml-2">Write</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Image
            src="/placeholder.svg"
            alt="Profile"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
        </Button>
      </div>
    </header>
  );
}
