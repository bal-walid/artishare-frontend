import { ChainedCommands, Editor } from "@tiptap/react";
import BubbleCommandButton from "./BubbleCommandButton";
import { useCallback } from "react";

interface ButtonItalicProps {
  editor: Editor;
  children: React.ReactNode;
}

const BubbleItalicButton = ({ editor, children }: ButtonItalicProps) => {
  const command = useCallback(
    (chain: ChainedCommands) => chain.toggleItalic(),
    []
  );

  const isActiveParams = { name: "italic" }; 

  return (
    <BubbleCommandButton editor={editor} command={command} isActiveParams={isActiveParams}>
      {children}
    </BubbleCommandButton>
  );
};

export default BubbleItalicButton;
