"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { createComment } from "@/app/_network/comments";
import { Comt, CreateComment } from "@/app/_type/comments";
import "@/app/_ui/stylesheets/editor.scss";
import { useAuthContext } from "@/app/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeartIcon, MessageCircleIcon, SendIcon } from "lucide-react";
import Tiptap from "../comment/Editor";
import { Editor } from "@tiptap/react";
import { serverAddress } from "@/app/_config/main";
import { Blog } from "@/app/_type/blogs";
import { CreateLike, Like } from "@/app/_type/likes";
import { createLike } from "@/app/_network/likes";
import formatDate from "@/lib/formatDate";

interface BlogCommentsProps {
  blog: Blog;
  initialComments: Comt[];
  likesCount: number;
  setLikesCount: Dispatch<SetStateAction<number>>;
  isLiked: boolean | Like | undefined;
  setIsLiked: Dispatch<SetStateAction<boolean | Like | undefined>>;
}

const BlogComments = ({
  blog,
  initialComments,
  likesCount,
  setLikesCount,
  isLiked,
  setIsLiked,
}: BlogCommentsProps) => {
  const { user } = useAuthContext();

  const [comments, setComments] = useState(initialComments);
  const [comment, setComment] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editor, setEditor] = useState<Editor | null>(null);
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
        user_id: user.id,
        blog_id: blog.id,
      };
      const result = await createComment(blog.id, newComment);
      setComments([result.comment, ...comments]);
      setComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="comments-section" className="space-y-8 pt-8 w-[680px] mx-auto">
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
      <h3 className="text-2xl font-semibold">Comments ({comments.length})</h3>
      {user && (
        <form onSubmit={handleComment} className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={serverAddress + user.profile_image}
                alt={user.first_name}
              />
              <AvatarFallback>
                {user.first_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Tiptap
              content={comment}
              onChange={setComment}
              setEditor={setEditor}
            >
              <Button type="submit" disabled={!comment.trim() || isSubmitting}>
                {isSubmitting ? (
                  "Posting..."
                ) : (
                  <>
                    Post Comment <SendIcon />
                  </>
                )}
              </Button>
            </Tiptap>
          </div>
        </form>
      )}
      {/* Comments list */}
      <div className="space-y-4 pb-20">
        {comments.map((comment: Comt, index) => (
          <div
            key={comment.id}
            className={`flex flex-col gap-4 px-4 py-6 hover:bg-muted/30 transition-colors border-b border-medium-gray/50 ${
              index === 0 ? "border-t" : ""
            } ${index === comments.length - 1 ? "border-none" : ""}`}
          >
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={serverAddress + comment.user.profile_image}
                  alt={comment.user.first_name}
                />
                <AvatarFallback>
                  {comment.user.first_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col ">
                <span className="font-medium hover:text-primary cursor-pointer">
                  {comment.user.first_name} {comment.user.last_name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(comment.created_at)}
                </span>
              </div>
            </div>
            <div
              className="text-[15px] ml-5 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogComments;
