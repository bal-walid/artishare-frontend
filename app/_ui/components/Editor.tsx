'use client'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import BubbleMenuWrapper from './BubbleMenu';

const extensions = [StarterKit];

const content = '<p>Hello World!</p>'

const Tiptap = () => {
  return (
    <EditorProvider extensions={extensions} content={content}>
      <BubbleMenuWrapper>

      </BubbleMenuWrapper>
    </EditorProvider>
  );
}

export default Tiptap;