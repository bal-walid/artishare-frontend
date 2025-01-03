import { Editor, ChainedCommands } from "@tiptap/react";
import BubbleButton from "./BubbleButton";
import React, {useCallback} from "react";

interface CommandButtonProps {
  editor: Editor;
  command: (chain: ChainedCommands ) => ChainedCommands;
  children: React.ReactNode;
  isActiveParams: {name: string, attributes?: {}}
}

const CommandButton = ({
  editor,
  command,
  children,
  isActiveParams
}: CommandButtonProps) => {
  const onClick = useCallback(() => {
    if (editor) {
      command(editor.chain().focus()).run();
    }
  }, [editor, command]);
  const {name, attributes} = isActiveParams;
  const isActive = editor.isActive(name, attributes);
  return (
    <BubbleButton onClick={onClick} isActive={isActive} editor={editor}>
      {children}
    </BubbleButton>
  );
};
export default CommandButton;
