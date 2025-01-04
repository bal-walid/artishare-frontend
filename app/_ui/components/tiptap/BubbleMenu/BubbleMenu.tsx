import { BubbleMenu, Editor, useCurrentEditor } from "@tiptap/react";
import { BubbleMenuPluginProps } from "@tiptap/extension-bubble-menu"
import "@/app/_ui/stylesheets/bubbleMenu.css";
import HeadingButton from "./Buttons/HeadingButton";
import BoldButton from "./Buttons/BoldButton";
import ItalicButton from "./Buttons/ItalicButton";
import BlockquoteButton from "./Buttons/BlockquoteButton";
import LinkButton from "./Buttons/LinkButton";
import { Link } from "lucide-react";

// TODO: figure out a better way to declare the type here
const shouldShow = (props: any) => {
  const {editor, from, to} = props;
  if (editor.isActive('image') || (from == to)) {
    return false;
  }
  return true;
}


const BubbleMenuWrapper = ({}) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;
  return (
    <BubbleMenu shouldShow={shouldShow} editor={editor} className="bubble-menu">
      <BoldButton editor={editor}>
        <span className="font-bold text-2xl"> B</span>
      </BoldButton>
      <ItalicButton editor={editor}>
        <span className="italic text-2xl"> i</span>
      </ItalicButton>
      <LinkButton editor={editor}>
        <Link size={24} fontWeight={600} />
      </LinkButton>
      <div className="separator text-md" />
      <HeadingButton level={1} editor={editor}>
        <h1 className="text-2xl">h1</h1>
      </HeadingButton>
      <HeadingButton level={2} editor={editor}>
        <h2 className="text-lg">h2</h2>
      </HeadingButton>
      <div className="separator" />
      <BlockquoteButton editor={editor}>&gt;</BlockquoteButton>
    </BubbleMenu>
  );
};
export default BubbleMenuWrapper;
