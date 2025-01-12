"use client";

import { serverAddress } from "@/app/_config/main";
import { deleteBlog } from "@/app/_network/blogs";
import { Blog } from "@/app/_type/blogs";
import { Like } from "@/app/_type/likes";
import "@/app/_ui/stylesheets/editor.scss";
import { useAuthContext } from "@/app/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import formatDate from "@/lib/formatDate";
import { HeartIcon, MessageCircleIcon, PenSquare, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DestructiveDialog } from "../admin/DestructiveDialog";

interface BlogContentProps {
  blog: Blog;
  onScrollToComments: () => void;
  commentsCount: number;
  likesCount: number;
  isLiked: boolean | Like | undefined;
}

const BlogContent = ({
  blog,
  onScrollToComments,
  commentsCount,
  likesCount,
  isLiked,
}: BlogContentProps) => {
  const { user, isAdmin } = useAuthContext();

  const initials = blog.user.first_name.charAt(0).toUpperCase();
  const router = useRouter();

  const handleDelete = async () => {
    const deleted = await deleteBlog(blog.id);
    if (deleted) {
      router.push("/blogs");
    }
  };

  return (
    <article className="blog-view">
      <div className="blog-header">
        <h1 className="blog-title text-4xl font-bold tracking-tight lg:text-5xl">
          {blog.title}
        </h1>
        <h2 className="blog-subtitle text-xl text-gray-600">
          {blog.description}
        </h2>
        <div className="flex gap-3 py-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-secondary !m-0">
              <AvatarImage
                src={serverAddress + blog.user.profile_image}
                alt={blog.user.first_name}
                className="!m-0"
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">
                {blog.user.first_name + " " + blog.user.last_name}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDate(blog.created_at)}
              </span>
            </div>
          </div>
          <div className="ml-auto">
            {isAdmin && (
              <DestructiveDialog
                title="Delete this blog?"
                description="This action cannot be undone."
                onConfirm={handleDelete}
                triggerText="Delete"
                TriggerIcon={Trash}
              />
            )}
            {blog.user.id === user?.id && (
              <Link href={`/edit/${blog.id}`}>
                <Button>
                  <PenSquare /> Edit
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-y mt-6 py-2 px-4">
        <div className="flex items-center gap-6 max-sm:w-full max-sm:justify-evenly">
          <button
            onClick={onScrollToComments}
            className="flex items-center gap-2 text-medium-gray hover:text-black"
          >
            <HeartIcon
              strokeWidth={1}
              className={`h-5 w-5 ${isLiked ? "fill-red-500" : ""}`}
            />
            <span>{likesCount} <span className="max-sm:hidden">likes</span></span>
          </button>
          <button
            onClick={onScrollToComments}
            className="flex items-center gap-2 text-medium-gray hover:text-black"
          >
            <MessageCircleIcon strokeWidth={1} className="h-5 w-5" />
            <span>{commentsCount} <span className="max-sm:hidden">comments</span></span>
          </button>
        </div>
      </div>

      <div
        className="pt-4"
        dangerouslySetInnerHTML={{ __html: blog.body }}
      ></div>
    </article>
  );
};

export default BlogContent;
