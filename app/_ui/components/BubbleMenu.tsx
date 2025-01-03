import { BubbleMenu, BubbleMenuProps, useCurrentEditor } from "@tiptap/react";
import "@/app/_ui/stylesheets/bubble-menu.css"
import BubbleCommandButton from "./BubbleCommandButton";
import BubbleHeadingButton from "./BubbleHeadingButton";
import BubbleBoldButton from "./BubbleBoldButton";
import BubbleItalicButton from "./BubbleItalicButton";
import BubbleBlockquoteButton from "./BubbleBlockquoteButton";

const BubbleMenuWrapper = ({}) => {
  const {editor} = useCurrentEditor();
  if (!editor) return null;
  return (
    <BubbleMenu editor={editor} className="bubble-menu">
      <BubbleHeadingButton level={1} editor={editor}>H1</BubbleHeadingButton>
      <BubbleHeadingButton level={2} editor={editor}>H2</BubbleHeadingButton>
      <BubbleBoldButton editor={editor}>B</BubbleBoldButton>
      <BubbleItalicButton editor={editor}>I</BubbleItalicButton>
      <BubbleBlockquoteButton editor={editor}>&gt;</BubbleBlockquoteButton>
    </BubbleMenu>
  );
}
export default BubbleMenuWrapper;