'use client'
import { EditorProvider, UseEditorOptions } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import BubbleMenuWrapper from './tiptap/BubbleMenu/BubbleMenu';
import { HTMLAttributes } from 'react';

const extensions = [StarterKit];

const content = '<p>Hello World!</p>'

const editorProps : UseEditorOptions = {
  immediatelyRender: false,
}

const editorContainerProps : HTMLAttributes<HTMLDivElement> = {
  className: 'tiptap-editor'
}

const Tiptap = () => {
  return (
    <EditorProvider {...editorProps} editorContainerProps={editorContainerProps} extensions={extensions} content={content}>
      <BubbleMenuWrapper>

      </BubbleMenuWrapper>
    </EditorProvider>
  );
}

export default Tiptap;