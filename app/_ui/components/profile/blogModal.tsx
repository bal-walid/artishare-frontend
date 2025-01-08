"use client";

import { serverAddress } from "@/app/_config/main";
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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Eye,
  MessageSquare,
  MoreVertical,
  Pen,
  ThumbsUp,
  Trash,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"comments" | "analytics">(
    "comments"
  );
  useEffect(() => {
    const getDailyLikes = () => {
      const allLikes = blog.likes;
      const dailyLikesMap = new Map<string, number>();

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dailyLikesMap.set(date.toLocaleDateString(), 0);
      }

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
    try {
      setIsLoading(true);
      await onDelete?.(blog.id);
      window.location.reload();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="transition-all duration-300 hover:border-primary hover:text-primary hover:scale-105"
        >
          <Pen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] md:max-w-[85%] lg:max-w-[75%] max-h-[90vh] p-0 gap-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <DialogHeader className="px-4 md:px-6 py-4 flex-row items-center justify-between border-b backdrop-blur-sm bg-background/95 sticky top-0 z-10">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Blog Details
            </DialogTitle>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10 transition-colors"
                    disabled={isLoading}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => onUpdate?.(blog)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Pen className="h-4 w-4" />
                    <span>Edit Blog</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Skeleton className="h-4 w-4 rounded-full" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                    <span>{isLoading ? "Deleting..." : "Delete Blog"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="grid md:grid-cols-2  overflow-hidden">
            <div className="relative bg-muted/30 group">
              <Image
                src={serverAddress + blog.preview}
                alt={blog.title}
                fill
                className="object-cover "
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-main mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-main/80 line-clamp-2">
                    {blog.description}
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col h-full overflow-y-auto">
              <div className="p-4 md:p-6 space-y-6 overflow-x-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex flex-wrap gap-2">
                    {blog.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-main text-white rounded-full text-sm font-medium transition-colors"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span>
                        {blog.user.first_name} {blog.user.last_name}
                      </span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <span>
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2 transition-all duration-300 hover:bg-muted/70">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Likes</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold">
                      {blog.likes.length}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2 transition-all duration-300 hover:bg-muted/70">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Comments</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold">
                      {blog.comments.length}
                    </p>
                  </div>
                </motion.div>

                <div className="flex gap-2 border-b">
                  <Button
                    variant="ghost"
                    className={cn(
                      "relative h-9 rounded-none",
                      activeTab === "comments" && "text-primary"
                    )}
                    onClick={() => setActiveTab("comments")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comments
                    {activeTab === "comments" && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeTab"
                      />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn(
                      "relative h-9 rounded-none",
                      activeTab === "analytics" && "text-primary"
                    )}
                    onClick={() => setActiveTab("analytics")}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Analytics
                    {activeTab === "analytics" && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeTab"
                      />
                    )}
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "comments" ? (
                    <motion.div
                      key="comments"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="text-base font-medium flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Latest Comments
                      </h4>
                      <div className="space-y-4 min-w-[513px] h-[300px]">
                        {blog.comments.slice(0, 3).map((comment, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg bg-muted/30 space-y-3 transition-all duration-300 hover:bg-muted/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-primary/20">
                                <Image
                                  src={
                                    serverAddress + comment.user.profile_image
                                  }
                                  fill
                                  alt="profile pic"
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <span className="font-medium block">
                                  {comment.user.first_name}{" "}
                                  {comment.user.last_name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(
                                    comment.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <p
                              className="text-sm text-muted-foreground leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: comment.content,
                              }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="analytics"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="text-base font-medium flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Weekly Engagement
                      </h4>
                      <div className="h-[300px] bg-muted/30 rounded-lg p-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={weeklyLikes}>
                            <defs>
                              <linearGradient
                                id="colorLikes"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="hsl(var(--primary))"
                                  stopOpacity={0.3}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="hsl(var(--primary))"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
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
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="likes"
                              stroke="hsl(var(--primary))"
                              fill="url(#colorLikes)"
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
