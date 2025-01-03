"use client";
import { EditorProvider, UseEditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import BubbleMenu from "./BubbleMenu/BubbleMenu";
import Link from "@tiptap/extension-link";

import FloatingMenu from "./FloatingMenu/FloatingMenu";
import { HTMLAttributes } from "react";
import "@/app/_ui/stylesheets/editor.scss";

const HeadingFirstDocument = Document.extend({
  content: "heading block*",
});

const extensions = [
  StarterKit.configure({ document: false }),
  HeadingFirstDocument,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "Your story's title";
      }
      return "Tell your story";
    },
  }),
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
  }),
];

const editorProps: UseEditorOptions = {
  immediatelyRender: false,
};

const editorContainerProps: HTMLAttributes<HTMLDivElement> = {
  className: "tiptap-editor",
};

const Tiptap = () => {
  return (
    <EditorProvider
      {...editorProps}
      editorContainerProps={editorContainerProps}
      extensions={extensions}
    >
      <BubbleMenu></BubbleMenu>
      <FloatingMenu></FloatingMenu>
    </EditorProvider>
  );
};

export default Tiptap;
