import { BubbleMenu, Editor, useCurrentEditor } from "@tiptap/react";
import { BubbleMenuPluginProps } from "@tiptap/extension-bubble-menu"
import "@/app/_ui/stylesheets/bubbleMenu.css";
import HeadingButton from "./Buttons/HeadingButton";
import BoldButton from "./Buttons/BoldButton";
import ItalicButton from "./Buttons/ItalicButton";
import BlockquoteButton from "./Buttons/BlockquoteButton";
import LinkButton from "./Buttons/LinkButton";
import { Link, Bold, Italic, Quote, Type } from "lucide-react";

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
        <Bold size={21} fontWeight={600}/>
      </BoldButton>
      <ItalicButton editor={editor}>
        <Italic size={21} fontWeight={600}/>
      </ItalicButton>
      <LinkButton editor={editor}>
        <Link size={21} fontWeight={600} />
      </LinkButton>
      <div className="separator text-md" />
      <HeadingButton level={1} editor={editor}>
        <Type size={21} fontWeight={600}/>
      </HeadingButton>
      <HeadingButton level={2} editor={editor}>
        <Type size={17} fontWeight={600}/>
      </HeadingButton>
      <div className="separator" />
      <BlockquoteButton editor={editor}><Quote fill="white" transform="rotate(180)" size={20} strokeWidth={0.2}/></BlockquoteButton>
    </BubbleMenu>
  );
};
export default BubbleMenuWrapper;
