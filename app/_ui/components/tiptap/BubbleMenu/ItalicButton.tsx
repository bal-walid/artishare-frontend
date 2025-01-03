import { ChainedCommands, Editor } from "@tiptap/react";
import CommandButton from "./CommandButton";
import { useCallback } from "react";

interface ButtonItalicProps {
  editor: Editor;
  children: React.ReactNode;
}

const ItalicButton = ({ editor, children }: ButtonItalicProps) => {
  const command = useCallback(
    (chain: ChainedCommands) => chain.toggleItalic(),
    []
  );

  const isActiveParams = { name: "italic" }; 

  return (
    <CommandButton editor={editor} command={command} isActiveParams={isActiveParams}>
      {children}
    </CommandButton>
  );
};

export default ItalicButton;
