"use client";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Editor, EditorProvider, UseEditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenu from "./BubbleMenu/BubbleMenu";
import Youtube from "@tiptap/extension-youtube";

import "@/app/_ui/stylesheets/editor.scss";
import { HTMLAttributes, MutableRefObject, RefObject } from "react";
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
  Youtube.configure({
    inline: true,
    width: 640,
    height: 360,
    controls: false,
    HTMLAttributes: {
      class: " block  mx-auto w-[80%] ",
    },
  }),
];

const editorProps: UseEditorOptions = {
  immediatelyRender: false,
};

const editorContainerProps: HTMLAttributes<HTMLDivElement> = {
  className: "tiptap-editor",
};

interface TiptapProps {
  editorRef: RefObject<Editor | null>
}

const Tiptap = ({editorRef} : TiptapProps) => {
  return (
    <div className=" pb-24 mt-24">
      <EditorProvider
        {...editorProps}
        editorContainerProps={editorContainerProps}
        extensions={extensions}
        onCreate={({editor}) => editorRef.current = editor}
      >
        <BubbleMenu></BubbleMenu>
        <FloatingMenu></FloatingMenu>
      </EditorProvider>
    </div>
  );
};

export default Tiptap;
