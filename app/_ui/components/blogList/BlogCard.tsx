import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, HeartIcon, MessageCircleIcon } from "lucide-react";
import formatDate from "@/lib/formatDate";
import Image from "next/image";
import { Blog } from "@/app/_type/blogs";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Card className="border-0 border-b rounded-none shadow-none">
      <CardHeader className="py-4 px-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7 border-2 border-secondary rounded-full">
              <AvatarImage
                src={blog.user.profile_image}
                alt={blog.user.first_name}
                className="h-full w-full rounded-full"
              />
            </Avatar>
            <span className="text-xs">{blog.user.first_name}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-6">
        <div className="flex  justify-between">
          <div className="space-y-2 flex-1">
            <h2 className="text-2xl font-bold leading-tight">{blog.title}</h2>
            <p className="text-muted-foreground">{blog.description}</p>
            <div className="flex items-center gap-3 text-xs text-medium-gray">
              <span>{formatDate(blog.created_at)}</span>
              <span className="inline-flex gap-1 items-center">
                <MessageCircleIcon
                  strokeWidth={0}
                  fill="#6B6B6B"
                  className="h-4 w-4"
                />

                <span>{blog.comments.length}</span>
              </span>
              <span className="inline-flex gap-1 items-center">
                <HeartIcon strokeWidth={0} fill="#6B6B6B" className="h-4 w-4" />

                <span>{blog.likes.length}</span>
              </span>
              <Button className="ml-auto" variant="mediumLike" size="icon">
                <BookmarkIcon strokeWidth={1} className="!h-6 !w-6 " />
              </Button>
            </div>
          </div>
          <Image
            src="/placeholder.svg"
            alt="Blog cover image"
            width={160}
            height={107}
            className="h-[107px] object-cover rounded-sm ml-16"
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default BlogCard;
