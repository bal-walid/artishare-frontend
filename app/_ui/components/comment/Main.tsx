"use client";

import React, { useState } from "react";
import Tiptap from "./Editor";
import { MessageCircle } from "lucide-react";

const CommentForm = () => {
  const [content, setContent] = useState<string>("");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle the comment submission
    console.log("Submitted comment:", content);
    setContent("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle className="w-6 h-6 text-[#B22C46]" />
          <h2 className="text-2xl font-semibold text-[#B22C46]">
            Leave a comment
          </h2>
        </div>
        <div className="bg-hero-bg rounded-lg p-4">
          <div className="prose prose-sm max-w-none">
            <Tiptap
              content={content}
              onChange={(newContent: string) => handleContentChange(newContent)}
            />
          </div>
        </div>
        {content && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#B22C46] text-white rounded-md hover:bg-[#B22C46]/90 transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#B22C46] focus:ring-offset-2"
            >
              Post Comment
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CommentForm;
