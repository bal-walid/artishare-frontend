"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./ToolBar";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";

interface Props {
  onChange: (newContent: string) => void;
  content: string;
  children?: React.ReactNode;
  setEditor: (editor: Editor) => void;
}

const Tiptap = ({ onChange, content, children, setEditor }: Props) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-foreground/20 border-t-0 text-black/80 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    immediatelyRender: true,
  });
  useEffect(() => {
    if (editor) setEditor(editor);
  }, [editor, setEditor]);

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content}>
        {children}
      </Toolbar>
      <EditorContent style={{ whiteSpace: "normal" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
