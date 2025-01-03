import { BubbleMenu, BubbleMenuProps, useCurrentEditor } from "@tiptap/react";
import "@/app/_ui/stylesheets/bubble-menu.css"
import BubbleButton from "./BubbleButton";

const BubbleMenuWrapper = () => {
  const {editor} = useCurrentEditor();
  return (
    <BubbleMenu editor={editor} className="bubble-menu">
      <BubbleButton editor={editor} onClick={() => editor?.chain().focus().toggleHeading({level: 1}).run()} isActive={() => true}> H1</BubbleButton>
    </BubbleMenu>
  );
}
export default BubbleMenuWrapper;