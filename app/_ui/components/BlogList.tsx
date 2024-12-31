"use client";
import { DisplayBlog } from "@/app/_type/blogs";
import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, HeartIcon, MessageCircleIcon } from "lucide-react";
import formatDate from "@/lib/formatDate";

const BlogList = () => {
  const [blogs, setBlogs] = useState(defaultBlogs);
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {blogs.map((blog, index) => (
        <Card
          key={index}
          className="border-0 border-b rounded-none shadow-none"
        >
          <CardHeader className="py-4 px-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 border-2 border-secondary">
                  <AvatarImage
                    src="/avatar_placeholder.png"
                    alt={blog.creator}
                  />
                </Avatar>
                <span className="text-xs">{blog.creator}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 pb-6">
            <div className="flex  justify-between">
              <div className="space-y-2 flex-1">
                <h2 className="text-2xl font-bold leading-tight">
                  {blog.title}
                </h2>
                <p className="text-muted-foreground">{blog.description}</p>
                <div className="flex items-center gap-3 text-xs text-medium-gray">
                  <span>{formatDate(blog.date)}</span>
                  <span className="inline-flex gap-1 items-center">
                    <MessageCircleIcon
                      strokeWidth={0}
                      fill="#6B6B6B"
                      className="h-4 w-4"
                    />

                    <span>{blog.commentCount}</span>
                  </span>
                  <span className="inline-flex gap-1 items-center">
                    <HeartIcon
                      strokeWidth={0}
                      fill="#6B6B6B"
                      className="h-4 w-4"
                    />

                    <span>{blog.likeCount}</span>
                  </span>
                  <Button className="ml-auto" variant="mediumLike" size="icon">
                    <BookmarkIcon strokeWidth={1} className="!h-6 !w-6 " />
                  </Button>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                alt=""
                className="h-24 w-32 object-cover rounded-sm ml-16"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const defaultBlogs: DisplayBlog[] = [
  {
    id: 1,
    title: "The Future of AI",
    description:
      "Exploring the advancements and ethical implications of artificial intelligence.",
    categories: ["Technology", "AI", "Ethics"],
    likeCount: 230,
    commentCount: 45,
    date: "2024-11-30T10:15:45.000000Z",
    creator: "John Doe",
  },
  {
    id: 2,
    title: "A Beginner's Guide to React",
    description:
      "Everything you need to know to get started with React development.",
    categories: ["Web Development", "React", "JavaScript"],
    likeCount: 150,
    commentCount: 30,
    date: "2023-12-28T14:30:20.000000Z",
    creator: "Jane Smith",
  },
  {
    id: 3,
    title: "10 Tips for Healthy Eating",
    description:
      "Practical advice for maintaining a balanced and nutritious diet.",
    categories: ["Health", "Nutrition", "Lifestyle"],
    likeCount: 320,
    commentCount: 65,
    date: "2022-08-25T08:00:00.000000Z",
    creator: "Alice Johnson",
  },
  {
    id: 4,
    title: "Traveling on a Budget",
    description: "How to see the world without breaking the bank.",
    categories: ["Travel", "Budgeting", "Lifestyle"],
    likeCount: 210,
    commentCount: 40,
    date: "2024-10-20T16:45:10.000000Z",
    creator: "Bob Brown",
  },
  {
    id: 5,
    title: "Mastering Python for Data Science",
    description:
      "A comprehensive guide to using Python in data analysis and machine learning.",
    categories: ["Data Science", "Python", "Programming"],
    likeCount: 270,
    commentCount: 50,
    date: "2024-12-15T12:10:00.000000Z",
    creator: "Charlie Green",
  },
  {
    id: 6,
    title: "The History of Video Games",
    description: "A journey through the evolution of gaming from Pong to VR.",
    categories: ["Gaming", "History", "Entertainment"],
    likeCount: 190,
    commentCount: 22,
    date: "2024-12-10T19:25:35.000000Z",
    creator: "Diana White",
  },
  {
    id: 7,
    title: "5 Steps to Improve Your Productivity",
    description: "Simple techniques to get more done in less time.",
    categories: ["Productivity", "Self-Help", "Career"],
    likeCount: 310,
    commentCount: 75,
    date: "2024-12-05T09:00:00.000000Z",
    creator: "Eve Black",
  },
  {
    id: 8,
    title: "Understanding Cryptocurrency",
    description:
      "Breaking down the basics of blockchain and digital currencies.",
    categories: ["Finance", "Cryptocurrency", "Technology"],
    likeCount: 250,
    commentCount: 60,
    date: "2024-12-01T23:15:10.000000Z",
    creator: "Frank Wilson",
  },
  {
    id: 9,
    title: "How to Start a Blog",
    description:
      "A beginner-friendly guide to creating and maintaining your own blog.",
    categories: ["Writing", "Blogging", "Entrepreneurship"],
    likeCount: 180,
    commentCount: 28,
    date: "2024-11-25T11:20:05.000000Z",
    creator: "Grace Thomas",
  },
  {
    id: 10,
    title: "The Art of Minimalism",
    description: "Discovering the joy of living with less.",
    categories: ["Lifestyle", "Minimalism", "Philosophy"],
    likeCount: 275,
    commentCount: 48,
    date: "2024-11-20T17:45:55.000000Z",
    creator: "Henry Martinez",
  },
  {
    id: 11,
    title: "Understanding Climate Change",
    description:
      "An overview of the science, effects, and solutions for global warming.",
    categories: ["Environment", "Science", "Sustainability"],
    likeCount: 340,
    commentCount: 85,
    date: "2024-11-15T20:10:15.000000Z",
    creator: "Isabel Perez",
  },
  {
    id: 12,
    title: "Top 10 Programming Languages in 2024",
    description:
      "A ranking of the most popular and versatile coding languages this year.",
    categories: ["Programming", "Technology", "Career"],
    likeCount: 290,
    commentCount: 55,
    date: "2024-11-10T13:30:45.000000Z",
    creator: "Jack Lewis",
  },
  {
    id: 13,
    title: "Meditation for Beginners",
    description:
      "How to start meditating and the benefits it brings to your mental health.",
    categories: ["Mental Health", "Meditation", "Self-Care"],
    likeCount: 225,
    commentCount: 42,
    date: "2024-11-05T07:50:30.000000Z",
    creator: "Karen Young",
  },
  {
    id: 14,
    title: "The Best Coffee Brewing Methods",
    description: "A guide to making the perfect cup of coffee at home.",
    categories: ["Food", "Beverages", "Lifestyle"],
    likeCount: 315,
    commentCount: 78,
    date: "2024-11-01T15:40:10.000000Z",
    creator: "Larry Scott",
  },
  {
    id: 15,
    title: "Getting Started with Machine Learning",
    description:
      "An introduction to the concepts and tools used in machine learning.",
    categories: ["Machine Learning", "AI", "Data Science"],
    likeCount: 400,
    commentCount: 95,
    date: "2024-10-25T22:15:55.000000Z",
    creator: "Mona King",
  },
];

export default BlogList;
