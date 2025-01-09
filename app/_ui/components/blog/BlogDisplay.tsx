"use client";

import { serverAddress } from "@/app/_config/main";
import { createComment } from "@/app/_network/comments";
import { createLike } from "@/app/_network/likes";
import { Blog } from "@/app/_type/blogs";
import { Comt, CreateComment } from "@/app/_type/comments";
import "@/app/_ui/stylesheets/editor.scss";
import { useAuthContext } from "@/app/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import formatDate from "@/lib/formatDate";
import { Editor } from "@tiptap/react";
import {
  HeartIcon,
  MessageCircleIcon,
  PenSquare,
  SendIcon,
  Trash,
} from "lucide-react";
import { useState } from "react";
import Tiptap from "../comment/Editor";
import Link from "next/link";
import { DestructiveDialog } from "../admin/DestructiveDialog";
import { deleteBlog } from "@/app/_network/blogs";
import { useRouter } from "next/navigation";
import { CreateLike } from "@/app/_type/likes";

interface BlogDisplayProps {
  blog: Blog;
}

const BlogDisplay = ({ blog }: BlogDisplayProps) => {
  const { user, isAdmin, isAuthenticated } = useAuthContext();
  const [isLiked, setIsLiked] = useState(
    isAuthenticated
      ? blog.likes.find((like) => like.user_id == user?.id)
      : false
  );
  const [likesCount, setLikesCount] = useState(blog.likes.length);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initials = blog.user.first_name.charAt(0).toUpperCase();
  const router = useRouter();
  console.log("Is admin: ", isAdmin);

  const scrollToComments = () => {
    document.getElementById("comments-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleLike = async () => {
    if (!user) return;
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    const newLike: CreateLike = {
      user_id: user.id,
      blog_id: blog.id,
    };
    await createLike(blog.id, newLike);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !user || isSubmitting) return;
    editor?.commands.clearContent();
    setIsSubmitting(true);
    try {
      const newComment: CreateComment = {
        content: comment,
        user_id: user?.id,
        blog_id: blog.id,
      };
      await createComment(blog.id, newComment);
      window.location.reload();
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const deleted = await deleteBlog(blog.id);
    if (deleted) {
      router.push("/blogs");
    }
  }

  return (
    <main className="max-w-[840px] mx-auto px-4 py-8">
      <article className="blog-view">
        <div className="blog-header">
          <div>
            <h1 className="blog-title text-4xl font-bold tracking-tight lg:text-5xl">
              {blog.title}
            </h1>
            <h2 className="blog-subtitle text-xl text-gray-600">
              {blog.description}
            </h2>
          </div>

          <div className="flex gap-3 py-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-secondary">
                <AvatarImage
                  src={serverAddress + blog.user.profile_image}
                  alt={blog.user.first_name}
                  className="!w-full !h-full !m-0"
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
      description="This action cannot be undone. This will permanently delete the blog."
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

          <div className="flex items-center justify-between border-y mt-6 py-2 px-4">
            <div className="flex items-center gap-6">
              <button
                onClick={scrollToComments}
                className="flex items-center gap-2 text-medium-gray hover:text-black transition-colors"
              >
                <MessageCircleIcon strokeWidth={1} className="h-5 w-5" />
                <span>{blog.comments.length} comments</span>
              </button>
              <div className="flex items-center gap-2 text-medium-gray">
              <HeartIcon
                  strokeWidth={1}
                  className={`h-5 w-5 ${
                    isLiked ? "fill-red-500 stroke-none" : ""
                  }`}
                />
                <span>{likesCount} likes</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-4"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        ></div>
      </article>
      <Separator className="my-8" />

      {/* Enhanced Author section */}
      <div className="flex flex-col gap-6 p-8 bg-muted/30 rounded-lg">
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20 ring-2 ring-secondary">
            <AvatarImage
              src={serverAddress + blog.user.profile_image}
              alt={blog.user.first_name}
              className="!w-full !h-full !m-0"
            />
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="text-2xl font-semibold">
                {blog.user.first_name} {blog.user.last_name}
              </h3>
              <p className="text-muted-foreground text-sm">
                Writer & Content Creator
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Passionate about sharing insights and experiences through writing.
              Join me on this journey of discovery and learning.
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Interactive bottom bar */}
      <div className=" bg-background/80 backdrop-blur-xl border-y py-3 px-4 -mx-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-medium-gray hover:text-black transition-colors group"
          >
            <HeartIcon
              strokeWidth={1}
              className={`h-5 w-5 transition-colors ${
                isLiked
                  ? "fill-red-500 stroke-none"
                  : "group-hover:fill-red-500 group-hover:stroke-none"
              }`}
            />
            <span>{likesCount} likes</span>
          </button>
          <button
            onClick={scrollToComments}
            className="flex items-center gap-2 text-medium-gray hover:text-black transition-colors"
          >
            <MessageCircleIcon strokeWidth={1} className="h-5 w-5" />
            <span>{blog.comments.length} comments</span>
          </button>
        </div>
      </div>

      {/* Enhanced Comments section */}
      <div id="comments-section" className="space-y-8 pt-8">
        <h3 className="text-2xl font-semibold">
          Comments ({blog.comments.length})
        </h3>

        {/* Comment form */}
        {!isAdmin && (
          <div className="bg-muted/30 rounded-lg p-6">
            <form onSubmit={handleComment} className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      user?.profile_image
                        ? serverAddress + user.profile_image
                        : undefined
                    }
                    alt={user?.first_name || "User"}
                  />
                  <AvatarFallback>
                    {user?.first_name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {user ? (
                    <Tiptap
                      content={comment}
                      onChange={(newContent) => setComment(newContent)}
                      setEditor={setEditor}
                    >
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={!user || !comment.trim() || isSubmitting}
                        >
                          {isSubmitting ? (
                            <>Posting...</>
                          ) : (
                            <>
                              <SendIcon className="w-4 h-4 mr-2" />
                              Post Comment
                            </>
                          )}
                        </Button>
                      </div>
                    </Tiptap>
                  ) : (
                    <div className="flex-1 px-4 py-3 border border-gray-700 rounded-md text-muted-foreground">
                      Please sign in to comment
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Comments list */}
        <div className="space-y-6">
          {blog.comments.map((comment: Comt) => (
            <div
              key={comment.id}
              className="flex gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={serverAddress + comment.user.profile_image}
                  alt={comment.user.first_name}
                />
                <AvatarFallback>
                  {comment.user.first_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium hover:text-primary cursor-pointer">
                    {comment.user.first_name} {comment.user.last_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <div
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogDisplay;
