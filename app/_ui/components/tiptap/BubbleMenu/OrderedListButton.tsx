import { ChainedCommands, Editor } from "@tiptap/react";
import CommandButton from "./CommandButton";
import { useCallback } from "react";

interface ButtonOrderedListProps {
  editor: Editor;
  children: React.ReactNode;
}

const OrderedListButton = ({ editor, children }: ButtonOrderedListProps) => {
  const command = useCallback(
    (chain: ChainedCommands) => chain.toggleOrderedList(),
    []
  );

  const isActiveParams = { name: "orderedList" };

  return (
    <CommandButton editor={editor} command={command} isActiveParams={isActiveParams}>
      {children}
    </CommandButton>
  );
};

export default OrderedListButton;
