import { ChainedCommands, Editor } from "@tiptap/react";
import CommandButton from "./CommandButton";
import { useCallback } from "react";

interface ButtonBoldProps {
  editor: Editor;
  children: React.ReactNode;
}

const BoldButton = ({ editor, children }: ButtonBoldProps) => {
  const command = useCallback(
    (chain: ChainedCommands) => chain.toggleBold(),
    []
  );

  const isActiveParams = { name: "bold" }; 

  return (
    <CommandButton editor={editor} command={command} isActiveParams={isActiveParams}>
      {children}
    </CommandButton>
  );
};

export default BoldButton;
