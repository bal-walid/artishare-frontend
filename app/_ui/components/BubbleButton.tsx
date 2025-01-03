import { Editor } from "@tiptap/react";
import React from "react";

interface BubbleButtonProps {
  editor: Editor | null,
  onClick: () => any,
  isActive?: () => boolean;
  children: React.ReactNode,
}

const BubbleButton = ({editor, onClick, isActive, children} : BubbleButtonProps) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
export default BubbleButton;