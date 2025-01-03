import { ChainedCommands, Editor } from "@tiptap/react";
import CommandButton from "./CommandButton";
import { useCallback } from "react";

interface ButtonBlockquoteProps {
  editor: Editor;
  children: React.ReactNode;
}

const BlockquoteButton = ({ editor, children }: ButtonBlockquoteProps) => {
  const command = useCallback(
    (chain: ChainedCommands) => chain.toggleBlockquote(),
    []
  );

  const isActiveParams = { name: "blockquote" };

  return (
    <CommandButton editor={editor} command={command} isActiveParams={isActiveParams}>
      {children}
    </CommandButton>
  );
};

export default BlockquoteButton;
