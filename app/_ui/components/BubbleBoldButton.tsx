import { ChainedCommands, Editor } from "@tiptap/react";
import BubbleCommandButton from "./BubbleCommandButton";
import { useCallback } from "react";

interface ButtonBoldProps {
  editor: Editor;
  children: React.ReactNode;
}

const BubbleBoldButton = ({ editor, children }: ButtonBoldProps) => {
  const command = useCallback(
    (chain: ChainedCommands) => chain.toggleBold(),
    []
  );

  const isActiveParams = { name: "bold" }; 

  return (
    <BubbleCommandButton editor={editor} command={command} isActiveParams={isActiveParams}>
      {children}
    </BubbleCommandButton>
  );
};

export default BubbleBoldButton;
