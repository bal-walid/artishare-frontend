"use client";

import { serverAddress } from "@/app/_config/main";
import { Blog } from "@/app/_type/blogs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

        <CardHeader className="py-6 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-secondary ring-offset-2 ring-offset-background transition-all duration-200 group-hover:ring-primary">
                <AvatarImage
                  src={serverAddress + blog.user.profile_image}
                  alt={blog.user.first_name}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{blog.user.first_name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(blog.created_at)}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pb-6 sm:p-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="space-y-3 flex-1">
              <h2 className="text-2xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">
                {blog.title}
              </h2>
              <p className="text-muted-foreground line-clamp-2">
                {blog.description}
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MessageCircleIcon className="h-4 w-4" />
                  <span>{blog.comments.length}</span>
                  <span className="sr-only">comments</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <HeartIcon className="h-4 w-4" />
                  <span>{blog.likes.length}</span>
                  <span className="sr-only">likes</span>
                </div>
              </div>
              {/* Categories section */}
              <div className="flex flex-wrap gap-2 pt-2">
                {blog.categories.map((category) => (
                  <span
                    key={category.id}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative aspect-[3/2] sm:w-[200px] rounded-lg overflow-hidden">
              <Image
                src={serverAddress + blog.preview}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
