"use client";

import { type Editor } from "@tiptap/react";
import { Bold, Italic, Redo, Underline, Undo } from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
  children?: React.ReactNode;
};

const Toolbar = ({ editor, children }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-foreground/20 bg-hero-bg"
    >
      <div className="flex justify-start items-center gap-5 w-full  flex-wrap">
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
        <div className="ml-auto">{children}</div>
      </div>
    </div>
  );
};

export default Toolbar;
