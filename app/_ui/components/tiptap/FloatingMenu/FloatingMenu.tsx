import { Button } from "@/components/ui/button";
import { FloatingMenu, useCurrentEditor } from "@tiptap/react";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CancelButton from "./Buttons/CancelButton";
import CodeButton from "./Buttons/CodeButton";
import ImageButton from "./Buttons/ImageButton";
import QuoteButton from "./Buttons/QuoteButton";
import VideoButton from "./Buttons/VideoButton";

const FloatingMenuWrapper = () => {
  const { editor } = useCurrentEditor();
  const [showMenu, setShowMenu] = useState(false);

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
          onClick={() => setShowMenu(!showMenu)}
        >
          <PlusCircle className="!h-9 !w-9" strokeWidth={0.5} />
        </Button>

        {showMenu && (
          <div className="absolute left-full ml-2 flex items-center gap-1 rounded-full border bg-background p-1 shadow-lg">
            <CancelButton hideMenu={() => setShowMenu(false)} />
            <VideoButton hideMenu={() => setShowMenu(false)} />
            <ImageButton hideMenu={() => setShowMenu(false)} />
            <QuoteButton hideMenu={() => setShowMenu(false)} />
            <CodeButton hideMenu={() => setShowMenu(false)} />
          </div>
        )}
      </div>
    </FloatingMenu>
  );
};

export default FloatingMenuWrapper;
