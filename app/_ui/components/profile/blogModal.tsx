"use client";

import { Blog } from "@/app/_type/blogs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  MessageSquare,
  MoreVertical,
  Pen,
  ThumbsUp,
  Trash,
} from "lucide-react";
import Image from "next/image";

// Mock weekly likes data
const weeklyLikes = [
  { week: "Week 1", likes: 23 },
  { week: "Week 2", likes: 45 },
  { week: "Week 3", likes: 32 },
  { week: "Week 4", likes: 67 },
];

interface BlogModalProps {
  blog: Blog;
  onDelete?: (id: number) => void;
  onUpdate?: (blog: Blog) => void;
}
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BlogModal({ blog, onDelete, onUpdate }: BlogModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pen className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[75%] h-[75vh] p-0">
        <DialogHeader className="px-6 py-4 flex-row items-center justify-between">
          <DialogTitle>Blog Details</DialogTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onUpdate?.(blog)}>
                <Pen className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(blog.id)}
                className="text-destructive"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogHeader>
        <div className="grid grid-cols-2 h-[calc(75vh-64px)]">
          <div className="relative">
            <Image
              src="/placeholder.svg"
              alt={blog.title}
              fill
              className="object-cover"
              style={{ aspectRatio: "3/2" }}
            />
          </div>
          <div className="flex flex-col">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="text-muted-foreground mb-4">{blog.description}</p>
              <div className="flex gap-2 mb-4">
                {blog.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Created by {blog.creator.first_name} {blog.creator.last_name}
              </p>
            </div>
            <Separator />
            <ScrollArea className="flex-1 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{blog.likes.length} likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>{blog.comments.length} comments</span>
                </div>
              </div>
              <div className="h-[300px]">
                <h3 className="text-lg font-semibold mb-4">
                  Weekly Engagement
                </h3>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyLikes}>
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Line
                        type="monotone"
                        dataKey="likes"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
