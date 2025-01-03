import { ChainedCommands, Editor } from "@tiptap/react";
import BubbleCommandButton from "./BubbleCommandButton";
import { useCallback } from "react";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

interface BubbleHeadingButtonProps {
  editor: Editor;
  level: Level;
  children: React.ReactNode;
}

const BubbleHeadingButton = ({ editor, level, children }: BubbleHeadingButtonProps) => {
  const command = useCallback(
    (chain: ChainedCommands) => chain.toggleHeading({ level }),
    []
  );
  const isActiveParams = {name: "heading", attributes: {level}};
  return (
    <BubbleCommandButton editor={editor} command={command} isActiveParams={isActiveParams}>
      {children}
    </BubbleCommandButton>
  );
};

export default BubbleHeadingButton;
