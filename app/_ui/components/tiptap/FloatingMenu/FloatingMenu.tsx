import { Button } from "@/components/ui/button";
import { FloatingMenu, useCurrentEditor } from "@tiptap/react";
import { PlusCircle } from "lucide-react";
import { useCallback, useState } from "react";
import CancelButton from "./Buttons/CancelButton";
import CodeButton from "./Buttons/CodeButton";
import ImageButton from "./Buttons/ImageButton";
import QuoteButton from "./Buttons/QuoteButton";
import VideoButton from "./Buttons/VideoButton";
import UnorderedListButton from "./Buttons/UnorderedListButton";
import OrderedListButton from "./Buttons/OrderedListButton";

const FloatingMenuWrapper = () => {
  const { editor } = useCurrentEditor();
  const [showMenu, setShowMenu] = useState(false);
  const hideMenu = () => setShowMenu(false);
  if (!editor) return null;

  return (
    <FloatingMenu
      tippyOptions={{ placement: "left" }}
      className="relative"
      editor={editor}
    >
      <div className="flex items-center">
        <Button
          variant={"mediumLike"}
          className="p-0"
          onClick={() => {setShowMenu(!showMenu)}}
        >
          <PlusCircle className="!h-9 !w-9 transition-transform" transform={showMenu ? "rotate(45)" : "rotate(0)"} strokeWidth={0.5} />
        </Button>

        {showMenu && (
          <div className="absolute left-full ml-2 flex items-center gap-1 rounded-full border bg-background p-1 shadow-lg">
            <ImageButton hideMenu={hideMenu}/>
            <VideoButton hideMenu={hideMenu} />
            <UnorderedListButton hideMenu={hideMenu} />
            <OrderedListButton hideMenu={hideMenu} />
            <QuoteButton hideMenu={hideMenu} />
            <CodeButton hideMenu={hideMenu} />
          </div>
        )}
      </div>
    </FloatingMenu>
  );
};

export default FloatingMenuWrapper;
