import { Blog } from "@/app/_type/blogs";
import "@/app/_ui/stylesheets/editor.scss";
import formatDate from "@/lib/formatDate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { serverAddress } from "@/app/_config/main";
import { HeartIcon, MessageCircleIcon } from "lucide-react";

interface BlogDisplayProps {
  blog: Blog;
}

const BlogDisplay = ({ blog }: BlogDisplayProps) => {
  const initials = blog.user.first_name.charAt(0).toUpperCase();
  return (
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

        <div className="flex items-center gap-3 py-4">
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
        </div>

        <div className="flex items-center gap-6 border-y mt-6 pl-2 py-2">
          <div className="flex items-center gap-2 text-medium-gray hover:text-black">
            <MessageCircleIcon strokeWidth={1} className="h-5 w-5" />
            <span>{blog.comments.length}</span>
            <span className="sr-only">comments</span>
          </div>
          <div className="flex items-center gap-2 text-medium-gray hover:text-black group">
            <HeartIcon strokeWidth={1} className="h-5 w-5 group-hover:fill-red-500 group-hover:stroke-none" />
            <span>{blog.likes.length}</span>
            <span className="sr-only">likes</span>
          </div>
        </div>
      </div>
      <div className="pt-4" dangerouslySetInnerHTML={{ __html: blog.body }}></div>
    </article>
  );
};
export default BlogDisplay;
