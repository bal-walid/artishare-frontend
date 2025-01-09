"use client";

import { Blog } from "@/app/_type/blogs";
import ProfileImageUpload from "@/app/_ui/components/profile/profileImageUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Mail,
  MessageSquare,
  PenSquare,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { deleteBlog } from "../_network/blogs";
import { Comt } from "../_type/comments";
import { BlogModal } from "../_ui/components/profile/blogModal";
import { EmptyState } from "../_ui/components/profile/emptyState";
import { useAuthContext } from "../contexts/AuthContext";
import { fetchUser } from "../_network/users";
import { User } from "../_type/users";

export default function ProfileView() {
  const { user: ActiveUser } = useAuthContext();
  const [user, setUser] = useState<User | null>(null);
  const profile_image = user?.profile_image;
  console.log(user);
  const commentedBlogs: Blog[] = useMemo(() => {
    return user ? user?.comments.map((comment) => comment.blog as Blog) : [];
  }, [user]);

  const likedBlogs: Blog[] = useMemo(() => {
    return user ? user?.likes.map((like) => like.blog as Blog) : [];
  }, [user]);
  useEffect(() => {
    async function fetchUserInformation() {
      if (!ActiveUser) return;
      const response = await fetchUser(ActiveUser.id);
      setUser(response.user);
    }
    fetchUserInformation();
  }, [ActiveUser]);
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pb-24 overflow-x-hidden">
      <div className="relative">
        {/* Enhanced background section */}
        <div className="relative h-[200px] w-full">
          <Image
            src="/bgProfile.jpg"
            alt="Profile cover"
            fill
            className="object-cover brightness-75 transition-all duration-500 hover:brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015]" />
        </div>

        {/* Enhanced profile content */}
        <div className="relative z-10 px-4 -mt-40 space-y-12 max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <ProfileImageUpload initialImage={profile_image} />
            </div>
            <div className="mt-6 text-center">
              <h1 className="text-4xl text-main font-bold bg-gradient-to-r from-primary to-primary/50 capitalize bg-clip-text">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-muted-foreground flex items-center justify-center gap-2 mt-3 text-lg">
                <Mail className="h-5 w-5" />
                {user.email}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="w-full backdrop-blur-sm bg-background/95 border-primary/10 shadow-xl shadow-primary/5">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StatsCard
                    icon={<ThumbsUp className="h-6 w-6" />}
                    title="Liked Blogs"
                    value={user.likes.length}
                  />
                  <StatsCard
                    icon={<MessageSquare className="h-6 w-6" />}
                    title="Commented Blogs"
                    value={user.comments.length}
                  />
                  <StatsCard
                    icon={<PenSquare className="h-6 w-6" />}
                    title="Created Blogs"
                    value={user.blogs.length}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <ProfileSection
            title="Your Blogs"
            icon={<PenSquare className="h-5 w-5" />}
            delay={0.4}
          >
            {user.blogs.length > 0 ? (
              <BlogCarousel
                blogs={user.blogs}
                showUpdateButton
                type="default"
                user={user}
              />
            ) : (
              <EmptyState
                icon={PenSquare}
                title="No blogs yet"
                description="Start writing your first blog post to share your thoughts with the world."
              />
            )}
          </ProfileSection>

          <ProfileSection
            title="Blogs You Liked"
            icon={<ThumbsUp className="h-5 w-5" />}
            delay={0.6}
          >
            {likedBlogs.length > 0 ? (
              <BlogCarousel
                blogs={likedBlogs}
                showUpdateButton={false}
                type="liked"
                user={user}
              />
            ) : (
              <EmptyState
                icon={ThumbsUp}
                title="No liked blogs"
                description="Explore and like blogs that interest you to see them here."
              />
            )}
          </ProfileSection>

          <ProfileSection
            title="Blogs You Commented On"
            icon={<MessageSquare className="h-5 w-5" />}
            delay={0.8}
          >
            {commentedBlogs.length > 0 ? (
              <BlogCarousel
                blogs={commentedBlogs}
                showUpdateButton={false}
                type="commented"
                user={user}
              />
            ) : (
              <EmptyState
                icon={MessageSquare}
                title="No comments yet"
                description="Join the conversation by commenting on blogs you find interesting."
              />
            )}
          </ProfileSection>
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
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-1000"></div>
      <div className="relative flex items-center gap-4 p-6 rounded-lg bg-background/40 backdrop-blur-sm border border-primary/10 transition-all duration-300 hover:scale-[1.02]">
        <div className="p-4 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ProfileSection({
  title,
  children,
  icon,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

interface BlogCarouselProps {
  blogs: Blog[];
  showUpdateButton?: boolean;
  type?: "default" | "commented" | "liked";
  user: User;
}

export function BlogCarousel({
  blogs,
  showUpdateButton = false,
  type = "default",
  user,
}: BlogCarouselProps) {
  const getUserComment = (blogId: number): Comt | undefined => {
    return user?.comments.find((comment) => comment.blog_id === blogId);
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {blogs.map((blog, id) => (
          <CarouselItem
            key={id}
            className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
          >
            <BlogCard
              blog={blog}
              showUpdateButton={showUpdateButton}
              type={type}
              userComment={
                type === "commented" ? getUserComment(blog.id) : undefined
              }
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-end gap-2 mt-4">
        <CarouselPrevious className="static translate-x-0 translate-y-0" />
        <CarouselNext className="static translate-x-0 translate-y-0" />
      </div>
    </Carousel>
  );
}
interface BlogCardProps {
  blog: Blog;
  showUpdateButton?: boolean;
  type?: "default" | "commented" | "liked";
  userComment?: Comt;
}

export function BlogCard({
  blog,
  showUpdateButton = false,
  type = "default",
  userComment,
}: BlogCardProps) {
  const router = useRouter();

  return (
    <Card className="group h-full overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
      <CardHeader className="space-y-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold capitalize line-clamp-1 group-hover:text-primary transition-colors">
            {blog.title}
          </CardTitle>
          {showUpdateButton && (
            <BlogModal
              blog={blog}
              onDelete={async (id) => {
                await deleteBlog(id);
              }}
              onUpdate={(blog) => {
                router.push(`/edit/${blog.id}`);
              }}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-2">{blog.description}</p>

        {type === "commented" && userComment && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-3 border-l-2 border-primary/20 pl-4"
          >
            <p className="text-sm font-medium text-primary">Your Comment:</p>
            <p
              className="text-sm text-muted-foreground italic"
              dangerouslySetInnerHTML={{ __html: userComment.content }}
            />

            <time className="text-xs text-muted-foreground block">
              {new Date(userComment.created_at).toLocaleDateString()}
            </time>
          </motion.div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{blog.comments?.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{blog.likes?.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={blog.created_at}>
              {new Date(blog.created_at).toLocaleDateString()}
            </time>
          </div>
          <p className="text-sm font-medium">
            By: {blog.user.first_name} {blog.user.last_name}
          </p>
        </div>
        <div className="pt-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-primary transition-colors"
            onClick={() => router.push(`/blog/${blog.id}`)}
          >
            View Blog
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
