import { ChainedCommands, Editor } from "@tiptap/react";
import CommandButton from "./CommandButton";

interface ButtonOrderedListProps {
  editor: Editor;
  children: React.ReactNode;
}

const OrderedListButton = ({ editor, children }: ButtonOrderedListProps) => {
  const command = (chain: ChainedCommands) => chain.toggleOrderedList();

  const isActiveParams = { name: "orderedList" };

  return (
    <CommandButton
      editor={editor}
      command={command}
      isActiveParams={isActiveParams}
    >
      {children}
    </CommandButton>
  );
};

export default OrderedListButton;
