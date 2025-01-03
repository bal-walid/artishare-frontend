import { ChainedCommands, Editor } from "@tiptap/react";
import BubbleCommandButton from "./BubbleCommandButton";
import { useCallback } from "react";

interface ButtonOrderedListProps {
  editor: Editor;
  children: React.ReactNode;
}

const BubbleOrderedListButton = ({ editor, children }: ButtonOrderedListProps) => {
  const command = useCallback(
    (chain: ChainedCommands) => chain.toggleOrderedList(),
    []
  );

  const isActiveParams = { name: "orderedList" };

  return (
    <BubbleCommandButton editor={editor} command={command} isActiveParams={isActiveParams}>
      {children}
    </BubbleCommandButton>
  );
};

export default BubbleOrderedListButton;
