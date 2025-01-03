import { ChainedCommands, Editor } from "@tiptap/react";
import CommandButton from "./CommandButton";

interface ButtonBulletListProps {
  editor: Editor;
  children: React.ReactNode;
}

const BulletListButton = ({ editor, children }: ButtonBulletListProps) => {
  const command = (chain: ChainedCommands) => chain.toggleBulletList();

  const isActiveParams = { name: "bulletList" };

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

export default BulletListButton;
