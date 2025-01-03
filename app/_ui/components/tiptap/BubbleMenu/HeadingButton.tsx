import { ChainedCommands, Editor } from "@tiptap/react";
import CommandButton from "./CommandButton";
import { useCallback } from "react";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingButtonProps {
  editor: Editor;
  level: Level;
  children: React.ReactNode;
}

const HeadingButton = ({ editor, level, children }: HeadingButtonProps) => {
  const command = useCallback(
    (chain: ChainedCommands) => chain.toggleHeading({ level }),
    []
  );
  const isActiveParams = {name: "heading", attributes: {level}};
  return (
    <CommandButton editor={editor} command={command} isActiveParams={isActiveParams}>
      {children}
    </CommandButton>
  );
};

export default HeadingButton;
