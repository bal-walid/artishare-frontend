import { Editor } from "@tiptap/react";
import React from "react";

interface BubbleButtonProps {
  editor: Editor,
  onClick: () => void,
  isActive?: boolean;
  children: React.ReactNode,
}

const BubbleButton = ({editor, onClick, isActive, children} : BubbleButtonProps) => {
  return (
    <button className={'bubble-btn ' + (isActive ? 'is-active' : '')} onClick={onClick}>
      {children}
    </button>
  );
}
export default BubbleButton;