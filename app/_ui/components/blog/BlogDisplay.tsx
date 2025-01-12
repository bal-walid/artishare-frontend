import { Blog } from "@/app/_type/blogs";
import { useAuthContext } from "@/app/contexts/AuthContext";
import { useState } from "react";
import BlogComments from "./BlogComments";
import BlogContent from "./BlogContent";

interface BlogDisplayProps {
  blog: Blog;
}
const BlogDisplay = ({ blog }: BlogDisplayProps) => {
  const { user, isAuthenticated } = useAuthContext();
  const scrollToComments = () => {
    document.getElementById("comments-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const [likesCount, setLikesCount] = useState(blog.likes.length);
  const [isLiked, setIsLiked] = useState(
    isAuthenticated
      ? blog.likes.find((like) => like.user_id == user?.id)
      : false
  );

  return (
    <main>
      <BlogContent
        blog={blog}
        onScrollToComments={scrollToComments}
        commentsCount={blog.comments.length}
        likesCount={likesCount}
        isLiked={isLiked}
      />
      <BlogComments
        blog={blog}
        initialComments={blog.comments}
        likesCount={likesCount}
        setLikesCount={setLikesCount}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />
    </main>
  );
};

export default BlogDisplay;
