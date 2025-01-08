"use client";

import { Blog } from "@/app/_type/blogs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Calendar,
  MessageSquare,
  MoreVertical,
  Pen,
  ThumbsUp,
  Trash,
  X,
  User,
} from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { serverAddress } from "@/app/_config/main";

interface DailyLikes {
  date: string;
  likes: number;
}

interface BlogModalProps {
  blog: Blog;
  onDelete?: (id: number) => Promise<void>;
  onUpdate?: (blog: Blog) => void;
}

export function BlogModal({ blog, onDelete, onUpdate }: BlogModalProps) {
  const [weeklyLikes, setWeeklyLikes] = useState<DailyLikes[]>([]);
  useEffect(() => {
    const getDailyLikes = () => {
      const allLikes = blog.likes;
      const dailyLikesMap = new Map<string, number>();

      // Get the date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Initialize all days in the past week with 0 likes
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dailyLikesMap.set(date.toLocaleDateString(), 0);
      }

      // Count likes for each day
      allLikes.forEach((like) => {
        const likeDate = new Date(like.created_at);
        if (likeDate >= sevenDaysAgo) {
          const dateString = likeDate.toLocaleDateString();
          dailyLikesMap.set(
            dateString,
            (dailyLikesMap.get(dateString) || 0) + 1
          );
        }
      });

      // Convert map to array and sort by date
      const dailyLikesArray = Array.from(dailyLikesMap, ([date, likes]) => ({
        date,
        likes,
      })).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      return dailyLikesArray;
    };

    setWeeklyLikes(getDailyLikes());
  }, [blog.likes]);

  const handleDelete = async () => {
    await onDelete?.(blog.id);
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] md:max-w-[85%] max-h-[90vh] p-0 gap-0">
        <DialogHeader className="px-4 md:px-6 py-4 flex-row items-center justify-between border-b">
          <DialogTitle className="text-xl">Blog Details</DialogTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onUpdate?.(blog)}>
                  <Pen className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete()}
                  className="text-destructive"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="hover:bg-muted">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="grid md:grid-cols-2">
          <div className="relative md:h-full bg-muted/30">
            <Image
              src={serverAddress + blog.preview}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-2 space-y-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
                  {blog.title}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {blog.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {blog.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-2 md:px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>
                    {blog.user.first_name} {blog.user.last_name}
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex-1 p-4 md:p-6 overflow-hidden">
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                <div className="p-3 md:p-4 rounded-lg bg-muted/50 space-y-1">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Likes</span>
                  </div>
                  <p className="text-xl md:text-2xl font-bold">
                    {blog.likes.length}
                  </p>
                </div>
                <div className="p-3 md:p-4 rounded-lg bg-muted/50 space-y-1">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Comments</span>
                  </div>
                  <p className="text-xl md:text-2xl font-bold">
                    {blog.comments.length}
                  </p>
                </div>
              </div>

              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base md:text-lg font-semibold">
                      Blog Analytics
                    </h3>
                    <div className="flex gap-2">
                      <CarouselPrevious className="static" />
                      <CarouselNext className="static" />
                    </div>
                  </div>
                  <CarouselContent>
                    <CarouselItem className="md:basis-full pl-0">
                      <div className="space-y-4 ml-10">
                        <h4 className="text-sm md:text-base font-medium">
                          Latest Comments
                        </h4>
                        <div className="space-y-3 md:space-y-4">
                          {blog.comments.slice(0, 3).map((comment, index) => (
                            <div
                              key={index}
                              className="p-3 md:p-4 rounded-lg bg-muted/30 space-y-2"
                            >
                              <div className="flex items-center gap-2">
                                <span className="relative h-8 md:h-12 w-8 md:w-12 rounded-full overflow-hidden shrink-0">
                                  <Image
                                    src={
                                      serverAddress + comment.user.profile_image
                                    }
                                    fill
                                    alt="profile pic"
                                    className="rounded-full object-cover"
                                  />
                                </span>
                                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                                  <span className="font-medium text-sm md:text-base">
                                    {comment.user.first_name}{" "}
                                    {comment.user.last_name}
                                  </span>
                                  <span className="text-xs md:text-sm text-muted-foreground">
                                    {new Date(
                                      comment.created_at
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {comment.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem className="md:basis-full">
                      <div className="space-y-4">
                        <h4 className="text-sm md:text-base font-medium">
                          Weekly Engagement
                        </h4>
                        <div className="h-[250px] md:h-[300px] bg-muted/30 rounded-lg p-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyLikes}>
                              <XAxis
                                dataKey="date"
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                              />
                              <YAxis
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                              />
                              <Tooltip
                                contentStyle={{
                                  background: "hsl(var(--background))",
                                  border: "1px solid hsl(var(--border))",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                }}
                              />
                              <Line
                                type="monotone"
                                dataKey="likes"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--primary))" }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
