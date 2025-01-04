"use client";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorProvider, UseEditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenu from "./BubbleMenu/BubbleMenu";

import "@/app/_ui/stylesheets/editor.scss";
import { HTMLAttributes } from "react";
import FloatingMenu from "./FloatingMenu/FloatingMenu";

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
  Image,
];

const editorProps: UseEditorOptions = {
  immediatelyRender: false,
};

const editorContainerProps: HTMLAttributes<HTMLDivElement> = {
  className: "tiptap-editor",
};

const Tiptap = () => {
  return (
    <div className=" pb-24">
      <EditorProvider
        {...editorProps}
        editorContainerProps={editorContainerProps}
        extensions={extensions}
      >
        <BubbleMenu></BubbleMenu>
        <FloatingMenu></FloatingMenu>
      </EditorProvider>
    </div>
  );
};

export default Tiptap;
