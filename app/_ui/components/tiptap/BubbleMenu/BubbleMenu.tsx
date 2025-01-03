import { BubbleMenu, useCurrentEditor } from "@tiptap/react";
import "@/app/_ui/stylesheets/bubbleMenu.css";
import HeadingButton from "./Buttons/HeadingButton";
import BoldButton from "./Buttons/BoldButton";
import ItalicButton from "./Buttons/ItalicButton";
import BlockquoteButton from "./Buttons/BlockquoteButton";

const BubbleMenuWrapper = ({}) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;
  return (
    <BubbleMenu editor={editor} className="bubble-menu">
      <HeadingButton level={1} editor={editor}>
        <h1 className="text-2xl">h1</h1>
      </HeadingButton>
      <HeadingButton level={2} editor={editor}>
        <h2 className="text-lg">h2</h2>
      </HeadingButton>
      <HeadingButton level={3} editor={editor}>
        <h2 className="text-md">h3</h2>
      </HeadingButton>
      <div className="separator" /> {/* Separator */}
      <BoldButton editor={editor}>
        <span className="font-bold"> B</span>
      </BoldButton>
      <ItalicButton editor={editor}>
        <span className="italic"> i</span>
      </ItalicButton>
      <BlockquoteButton editor={editor}>&gt;</BlockquoteButton>
    </BubbleMenu>
  );
};
export default BubbleMenuWrapper;
