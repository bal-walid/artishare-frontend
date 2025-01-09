"use client";

import { serverAddress } from "@/app/_config/main";
import { Blog } from "@/app/_type/blogs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { capitalize } from "@/lib/capitalize";
import formatDate from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog, className }: { blog: Blog; className?: string }) => {
  const initials = blog.user.first_name.charAt(0).toUpperCase();

  return (
    <Link href={`/blog/${blog.id}`}>
      <Card
        className={cn(
          "group border-0 border-b rounded-none shadow-none transition-all duration-200 hover:bg-accent/50 relative overflow-hidden",
          className
        )}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="pt-4 pb-1 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-secondary ring-offset-2 ring-offset-background transition-all duration-200 group-hover:ring-primary">
                <AvatarImage
                  src={serverAddress + blog.user.profile_image}
                  alt={blog.user.first_name}
                  sizes="40px"
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{capitalize(blog.user.first_name) + " " + capitalize(blog.user.last_name)}</span>

              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pb-6 ">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="space-y-3 flex-1">
              <h2 className="text-2xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">
                {blog.title}
              </h2>
              <p className="text-medium-gray line-clamp-2">
                {blog.description}
              </p>
              <div className="flex items-center gap-4 pt-2">
              <span className="text-sm text-medium-gray">{formatDate(blog.created_at)}</span>
                <div className="flex items-center gap-1.5 text-sm text-medium-gray">
                  <MessageCircleIcon className="h-4 w-4 fill-medium-gray" />
                  <span>{blog.comments.length}</span>
                  <span className="sr-only">comments</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-medium-gray">
                  <HeartIcon className="h-4 w-4 fill-medium-gray" />
                  <span>{blog.likes.length}</span>
                  <span className="sr-only">likes</span>
                </div>
              </div>
              {/* Categories section */}
              {blog.categories.length ?  <div className="flex flex-wrap gap-2 pt-2">
                {blog.categories.map((category) => (
                  <span
                    key={category.id}
                    className="px-3 py-1 bg-pink-200/50 text-main rounded-full text-sm font-medium"
                  >
                    {category.name}
                  </span>
                ))}
              </div> : ""}
            </div>


              <Image
                src={serverAddress + blog.preview}
                alt=""
                width={160}
                height={107}
                className="mr-4 border rounded-sm h-[107px] object-cover transition-transform duration-300 group-hover:scale-105"
              />

          </div>
        
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
