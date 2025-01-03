import { BubbleMenu, useCurrentEditor } from "@tiptap/react";
import "@/app/_ui/stylesheets/bubble-menu.css"
import HeadingButton from "./HeadingButton";
import BoldButton from "./BoldButton";
import ItalicButton from "./ItalicButton";
import BlockquoteButton from "./BlockquoteButton";

const BubbleMenuWrapper = ({}) => {
  const {editor} = useCurrentEditor();
  if (!editor) return null;
  return (
    <BubbleMenu editor={editor} className="bubble-menu">
      <HeadingButton level={1} editor={editor}>H1</HeadingButton>
      <HeadingButton level={2} editor={editor}>H2</HeadingButton>
      <BoldButton editor={editor}>B</BoldButton>
      <ItalicButton editor={editor}>I</ItalicButton>
      <BlockquoteButton editor={editor}>&gt;</BlockquoteButton>
    </BubbleMenu>
  );
}
export default BubbleMenuWrapper;