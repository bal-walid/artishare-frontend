import { ChainedCommands, Editor } from "@tiptap/react";
import BubbleCommandButton from "./BubbleCommandButton";
import { useCallback } from "react";

interface ButtonBulletListProps {
  editor: Editor;
  children: React.ReactNode;
}

const BubbleBulletListButton = ({ editor, children }: ButtonBulletListProps) => {
  const command = useCallback(
    (chain: ChainedCommands) => chain.toggleBulletList(),
    []
  );

  const isActiveParams = { name: "bulletList" };

  return (
    <BubbleCommandButton editor={editor} command={command} isActiveParams={isActiveParams}>
      {children}
    </BubbleCommandButton>
  );
};

export default BubbleBulletListButton;
