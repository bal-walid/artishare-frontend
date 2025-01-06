"use client";

import { Blog } from "@/app/_type/blogs";
import ProfileImageUpload from "@/app/_ui/components/profile/profileImageUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Mail, MessageSquare, PenSquare, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { BlogModal } from "../_ui/components/profile/blogModal";
import { EmptyState } from "../_ui/components/profile/emptyState";
import { useAuthContext } from "../contexts/AuthContext";
import { User } from "../_type/users";

// Mock data for demonstration
const mockUser: User = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  password: "******",
  created_at: "2024-01-01",
  updatedAt: "2024-01-01",
  blogs: [],
  likes: [],
  comments: [],
  profile_image: "/hero.png",
};

const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "First Blog",
    description: "This is my first blog",
    body: "Content here...",
    creator_id: 1,
    user: mockUser,
    comments: [
      {
        id: 101,
        content: "Great post!",
        userId: 2,
        user: mockUser,
        blogId: 1,
        created_at: "2024-01-02",
        updatedAt: "2024-01-02",
      },
      {
        id: 102,
        content: "I found this very helpful!",
        userId: 3,
        user: mockUser,
        blogId: 1,
        created_at: "2024-01-03",
        updatedAt: "2024-01-03",
      },
    ],
    likes: [],
    categories: [],
    created_at: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 4,
    title: "Second Blog",
    description: "This is my second blog",
    body: "Content here...",
    creator_id: 1,
    user: mockUser,
    comments: [
      {
        id: 103,
        content: "Interesting read!",
        userId: 4,
        user: mockUser,
        blogId: 4,
        created_at: "2024-01-04",
        updatedAt: "2024-01-04",
      },
    ],
    likes: [],
    categories: [],
    created_at: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

export const mockUser2 = {
  id: 2,
  name: "Jane Smith",
};

export const mockUser3 = {
  id: 3,
  name: "Alice Johnson",
};

export const mockUser4 = {
  id: 4,
  name: "Bob Brown",
};

const mockLikedBlogs: Blog[] = [
  {
    id: 2,
    title: "Liked Blog",
    description: "This is a blog I liked",
    body: "Content here...",
    creator_id: 2,
    user: { ...mockUser, id: 2 },
    comments: [],
    likes: [],
    categories: [],
    created_at: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 5,
    title: "Another Liked Blog",
    description: "This is another blog I liked",
    body: "Content here...",
    creator_id: 2,
    user: { ...mockUser, id: 2 },
    comments: [],
    likes: [],
    categories: [],
    created_at: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

const mockCommentedBlogs: Blog[] = [
  {
    id: 3,
    title: "Commented Blog",
    description: "This is a blog I commented on",
    body: "Content here...",
    creator_id: 3,
    user: { ...mockUser, id: 3 },
    comments: [],
    likes: [],
    categories: [],
    created_at: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: 6,
    title: "Another Commented Blog",
    description: "This is another blog I commented on",
    body: "Content here...",
    creator_id: 3,
    user: { ...mockUser, id: 3 },
    comments: [],
    likes: [],
    categories: [],
    created_at: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

export default function ProfileView() {
  const { user } = useAuthContext();
  console.log(user);
  if (!user) return null;
  const profile_image = user.profile_image;
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-background pb-24 overflow-x-hidden">
      <div className="relative">
        {/* Background image section */}
        <div className="relative h-[350px] w-full">
          <Image
            src="/bgProfile.jpg"
            alt="Profile cover"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-background/90" />
        </div>

        {/* Profile content */}
        <div className="relative z-10 px-4 -mt-32 space-y-8 max-w-[1200px] mx-auto ">
          <div className="flex flex-col items-center translate-y-5">
            <ProfileImageUpload initialImage={profile_image} />
            <div className="mt-4 text-center">
              <h1 className="text-3xl font-bold text-slate-800">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-slate-800/70 flex items-center justify-center gap-2 mt-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </p>
            </div>
          </div>

          <Card className="w-full backdrop-blur-sm   border-primary/10 shadow-lg shadow-primary/5">
            <CardContent className="p-6 ">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-hero-bg">
                <StatsCard
                  icon={<ThumbsUp className="h-5 w-5" />}
                  title="Liked Blogs"
                  value={user.likes.length}
                />
                <StatsCard
                  icon={<MessageSquare className="h-5 w-5" />}
                  title="Commented Blogs"
                  value={user.comments.length}
                />
                <StatsCard
                  icon={<PenSquare className="h-5 w-5" />}
                  title="Created Blogs"
                  value={user.blogs.length}
                />
              </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
            {mockBlogs.length > 0 ? (
              <BlogCarousel blogs={mockBlogs} showUpdateButton />
            ) : (
              <EmptyState
                icon={PenSquare}
                title="No blogs yet"
                description="Start writing your first blog post to share your thoughts with the world."
              />
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Blogs You Liked</h2>
            {user.blogs.length > 0 ? (
              <BlogCarousel blogs={mockLikedBlogs} showUpdateButton={false} />
            ) : (
              <EmptyState
                icon={ThumbsUp}
                title="No liked blogs"
                description="Explore and like blogs that interest you to see them here."
              />
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Blogs You Commented On</h2>
            {mockCommentedBlogs.length > 0 ? (
              <BlogCarousel
                blogs={mockCommentedBlogs}
                showUpdateButton={false}
              />
            ) : (
              <EmptyState
                icon={MessageSquare}
                title="No comments yet"
                description="Join the conversation by commenting on blogs you find interesting."
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function StatsCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10 transition-colors hover:bg-primary/10">
      <div className="p-3 rounded-full bg-primary/10 text-primary">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-primary">{value}</p>
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
      className="w-full mt-4 "
    >
      <CarouselContent className="ml-2 md:ml-4 ">
        {blogs.map((blog) => (
          <CarouselItem
            key={blog.id}
            className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 "
          >
            <BlogCard blog={blog} showUpdateButton={showUpdateButton} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="xl:flex justify-end gap-2 mt-4 hidden ">
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
    <Card className="h-full max-w-xs ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl capitalize ">{blog.title}</CardTitle>
          {showUpdateButton && (
            <BlogModal
              blog={blog}
              onDelete={(id) => {
                // Implement your delete logic here
                console.log("Deleting blog:", id);
              }}
              onUpdate={(blog) => {
                // Implement your update logic here
                console.log("Updating blog:", blog);
              }}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/70 line-clamp-2 ">{blog.description}</p>
        <div className="mt-4 flex flex-col flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex gap-2">
            <p>{blog.comments.length} comments</p>
            <p>{blog.likes.length} likes</p>
          </div>
          <p>
            By: {blog.user.first_name} {blog.user.last_name}
          </p>
          <p>Created: {new Date(blog.created_at).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
