"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-foreground/20 bg-hero-bg"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-[#B22C46] text-white p-2 rounded-lg"
              : "text-[#B22C46] hover:bg-[#B22C46]/10 p-2 rounded-lg transition-colors"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-[#B22C46] text-white p-2 rounded-lg"
              : "text-[#B22C46] hover:bg-[#B22C46]/10 p-2 rounded-lg transition-colors"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-[#B22C46] text-white p-2 rounded-lg"
              : "text-[#B22C46] hover:bg-[#B22C46]/10 p-2 rounded-lg transition-colors"
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-[#B22C46] text-white p-2 rounded-lg"
              : "text-[#B22C46] hover:bg-[#B22C46]/10 p-2 rounded-lg transition-colors"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-[#B22C46] text-white p-2 rounded-lg"
              : "text-[#B22C46] hover:bg-[#B22C46]/10 p-2 rounded-lg transition-colors"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-[#B22C46] text-white p-2 rounded-lg"
              : "text-[#B22C46] hover:bg-[#B22C46]/10 p-2 rounded-lg transition-colors"
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-[#B22C46] text-white p-2 rounded-lg"
              : "text-[#B22C46] hover:bg-[#B22C46]/10 p-2 rounded-lg transition-colors"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-[#B22C46] text-white p-2 rounded-lg"
              : "text-[#B22C46] hover:bg-[#B22C46]/10 p-2 rounded-lg transition-colors"
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-[#B22C46] text-white p-2 rounded-lg"
              : "text-[#B22C46] hover:bg-[#B22C46]/10 p-2 rounded-lg transition-colors"
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className="text-[#B22C46] hover:bg-[#B22C46]/10 p-2 rounded-lg transition-colors"
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className="text-[#B22C46] hover:bg-[#B22C46]/10 p-2 rounded-lg transition-colors"
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
      {content && (
        <button
          type="submit"
          className="px-4 bg-[#B22C46] text-white py-2 rounded-md hover:bg-[#B22C46]/90 transition-colors"
        >
          Add
        </button>
      )}
    </div>
  );
};

export default Toolbar;
