"use client";
import { EditorProvider, UseEditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document"
import BubbleMenuWrapper from "./tiptap/BubbleMenu/BubbleMenu";
import { HTMLAttributes } from "react";
import "@/app/_ui/stylesheets/editor.scss";

const HeadingFirstDocument = Document.extend({
  content: 'heading block*',
})

const extensions = [
  StarterKit.configure({document: false}),
  HeadingFirstDocument,
  Placeholder.configure({ placeholder: ({node}) => {
    if (node.type.name === 'heading') {
      return 'Your story\'s title';
    }
    return 'Tell your story'
  }}),
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
      <BubbleMenuWrapper></BubbleMenuWrapper>
    </EditorProvider>
  );
};

export default Tiptap;
