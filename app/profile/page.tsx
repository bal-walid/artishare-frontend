"use client";

import Image from "next/image";
import { User } from "@/app/_type/users";
import { Blog } from "@/app/_type/blogs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { playfairSC, inter } from "@/app/_ui/fonts";
import { Pen } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock data for demonstration
const mockUser: User = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  password: "******",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
};

const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "First Blog",
    description: "This is my first blog",
    body: "Content here...",
    creatorId: 1,
    creator: mockUser,
    comments: [],
    likes: [],
    categories: [],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 4,
    title: "Second Blog",
    description: "This is my second blog",
    body: "Content here...",
    creatorId: 1,
    creator: mockUser,
    comments: [],
    likes: [],
    categories: [],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

const mockLikedBlogs: Blog[] = [
  {
    id: 2,
    title: "Liked Blog",
    description: "This is a blog I liked",
    body: "Content here...",
    creatorId: 2,
    creator: { ...mockUser, id: 2 },
    comments: [],
    likes: [],
    categories: [],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 5,
    title: "Another Liked Blog",
    description: "This is another blog I liked",
    body: "Content here...",
    creatorId: 2,
    creator: { ...mockUser, id: 2 },
    comments: [],
    likes: [],
    categories: [],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

const mockCommentedBlogs: Blog[] = [
  {
    id: 3,
    title: "Commented Blog",
    description: "This is a blog I commented on",
    body: "Content here...",
    creatorId: 3,
    creator: { ...mockUser, id: 3 },
    comments: [],
    likes: [],
    categories: [],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 6,
    title: "Another Commented Blog",
    description: "This is another blog I commented on",
    body: "Content here...",
    creatorId: 3,
    creator: { ...mockUser, id: 3 },
    comments: [],
    likes: [],
    categories: [],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

export default function ProfileView() {
  return (
    <div className="min-h-screen">
      <div className="relative">
        {/* Background image section with arc */}
        <div className="relative h-[350px] w-full">
          <Image
            src="/bgProfile.jpg"
            alt="Profile cover"
            fill
            className="object-bottom object-cover w-full h-full"
            priority
          />
          {/* Arc overlay */}
          {/* <div className="absolute bottom-0 left-0 rounded-t-full right-0 h-36 bg-background" /> */}
        </div>

        {/* Profile content */}
        <div className="relative z-10 px-4 -mt-20 space-y-8 max-w-[1200px] mx-auto">
          <Card className="w-full">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4 pt-6">
                Profile Information
              </h2>
              <div
                className={`flex flex-row gap-5 p-2 justify-between w-full ${playfairSC.className}`}
              >
                <div className="space-y-2 w-1/2">
                  <p className="flex justify-between">
                    <span
                      className={
                        "font-semibold text-primary " + inter.className
                      }
                    >
                      FirstName:
                    </span>
                    <span>{mockUser.first_name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span
                      className={
                        "font-semibold text-primary " + inter.className
                      }
                    >
                      LastName:
                    </span>
                    <span>{mockUser.last_name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span
                      className={
                        "font-semibold text-primary " + inter.className
                      }
                    >
                      Email:
                    </span>
                    <span>{mockUser.email}</span>
                  </p>
                </div>
                <div className="space-y-2 w-1/2">
                  <p className="flex justify-between">
                    <span
                      className={
                        "font-semibold text-primary " + inter.className
                      }
                    >
                      NbreLikedBlogs:
                    </span>
                    <span>{mockLikedBlogs.length}</span>
                  </p>
                  <p className="flex justify-between">
                    <span
                      className={
                        "font-semibold text-primary " + inter.className
                      }
                    >
                      NbreCommentedBlogs:
                    </span>
                    <span>{mockCommentedBlogs.length}</span>
                  </p>
                  <p className="flex justify-between">
                    <span
                      className={
                        "font-semibold text-primary " + inter.className
                      }
                    >
                      NbreCreatedBlogs:
                    </span>
                    <span>{mockBlogs.length}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
            <BlogCarousel blogs={mockBlogs} showUpdateButton />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Blogs You Liked</h2>
            <BlogCarousel blogs={mockLikedBlogs} />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Blogs You Commented On</h2>
            <BlogCarousel blogs={mockCommentedBlogs} />
          </section>
        </div>
      </div>
    </div>
  );
}

function BlogCarousel({
  blogs,
  showUpdateButton = false,
}: {
  blogs: Blog[];
  showUpdateButton?: boolean;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="ml-2 md:ml-4">
        {blogs.map((blog) => (
          <CarouselItem
            key={blog.id}
            className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4"
          >
            <BlogCard blog={blog} showUpdateButton={showUpdateButton} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-end gap-2 mt-4">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}

function BlogCard({
  blog,
  showUpdateButton = false,
}: {
  blog: Blog;
  showUpdateButton?: boolean;
}) {
  return (
    <Card className="h-full max-w-xs">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl capitalize ">{blog.title}</CardTitle>
          {showUpdateButton && (
            <Button variant="outline" size="icon">
              <Pen className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/70 line-clamp-2">{blog.description}</p>
        <div className="mt-4 flex flex-col flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex gap-2">
            <p>{blog.comments.length} comments</p>
            <p>{blog.likes.length} likes</p>
          </div>
          <p>
            By: {blog.creator.first_name} {blog.creator.last_name}
          </p>
          <p>Created:01/01/2004</p>
        </div>
      </CardContent>
    </Card>
  );
}
