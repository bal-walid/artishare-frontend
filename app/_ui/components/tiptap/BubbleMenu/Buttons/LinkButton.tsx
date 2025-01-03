import { ChainedCommands, Editor } from "@tiptap/react";
import CommandButton from "./CommandButton";

interface ButtonItalicProps {
  editor: Editor;
  children: React.ReactNode;
}

const ItalicButton = ({ editor, children }: ButtonItalicProps) => {
  const command = (chain: ChainedCommands) => chain.toggleItalic();

  const isActiveParams = { name: "italic" };

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

export default ItalicButton;
