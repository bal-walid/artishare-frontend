import { ChainedCommands, Editor } from "@tiptap/react";
import BubbleCommandButton from "./BubbleCommandButton";
import { useCallback } from "react";

interface ButtonBlockquoteProps {
  editor: Editor;
  children: React.ReactNode;
}

const BubbleBlockquoteButton = ({ editor, children }: ButtonBlockquoteProps) => {
  const command = useCallback(
    (chain: ChainedCommands) => chain.toggleBlockquote(),
    []
  );

  const isActiveParams = { name: "blockquote" };

  return (
    <BubbleCommandButton editor={editor} command={command} isActiveParams={isActiveParams}>
      {children}
    </BubbleCommandButton>
  );
};

export default BubbleBlockquoteButton;
