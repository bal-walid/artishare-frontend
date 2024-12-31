"use client";

import { User } from "@/app/_type/users";
import { Blog } from "@/app/_type/blogs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-8 max-w-[1200px] mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
      <Card>
        <CardContent>
          <div className="space-y-2 pt-6">
            <p>
              <span className="font-semibold">Name:</span> {mockUser.first_name}{" "}
              {mockUser.last_name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {mockUser.email}
            </p>
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
      <CarouselContent className="-ml-2 md:-ml-4">
        {blogs.map((blog) => (
          <CarouselItem
            key={blog.id}
            className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
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
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{blog.title}</CardTitle>
          {showUpdateButton && (
            <Button variant="outline" size="sm">
              Update
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">{blog.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
          <p>{blog.comments.length} comments</p>
          <p>{blog.likes.length} likes</p>
          <p>Created:01/01/2004</p>
          <p>
            By: {blog.creator.first_name} {blog.creator.last_name}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
