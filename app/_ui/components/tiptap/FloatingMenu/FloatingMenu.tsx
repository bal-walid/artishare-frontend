import { Button } from "@/components/ui/button";
import { FloatingMenu, useCurrentEditor } from "@tiptap/react";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

import CodeButton from "./Buttons/CodeButton";
import ImageButton from "./Buttons/ImageButton";
import QuoteButton from "./Buttons/QuoteButton";
import VideoButton from "./Buttons/VideoButton";
import UnorderedListButton from "./Buttons/UnorderedListButton";
import OrderedListButton from "./Buttons/OrderedListButton";
import { cn } from "@/lib/utils";

const ANIMATION_DELAY = 50; // ms per item

const FloatingMenuWrapper = () => {
  const { editor } = useCurrentEditor();
  const [showMenu, setShowMenu] = useState(false);
  const hideMenu = () => setShowMenu(false);

  if (!editor) return null;

  const buttons = [
    { Component: VideoButton, delay: 6 },
    { Component: ImageButton, delay: 6 },
    { Component: UnorderedListButton, delay: 4 },
    { Component: OrderedListButton, delay: 3 },
    { Component: QuoteButton, delay: 2 },
    { Component: CodeButton, delay: 1 },
  ];

  return (
    <FloatingMenu
      tippyOptions={{ placement: "left" }}
      className="relative"
      editor={editor}
    >
      <div className="flex items-center">
        <Button
          variant="mediumLike"
          className="p-0"
          onClick={() => setShowMenu(!showMenu)}
        >
          <PlusCircle
            className={cn(
              "!h-9 !w-9 transition-transform duration-200",
              showMenu && "rotate-45"
            )}
            strokeWidth={0.5}
          />
        </Button>


        {showMenu && (
          <div className="absolute left-full ml-2 flex items-center gap-1 p-1 shadow-lg bg-background/80 backdrop-blur-sm rounded-lg">
            {buttons.map(({ Component, delay }, index) => (
              <div
                key={index}
                className="opacity-0"
                style={{
                  animation: `rotate-in 200ms ${
                    delay * ANIMATION_DELAY
                  }ms ease-out forwards`,
                }}
              >
                <Component hideMenu={hideMenu} editor={editor} />
              </div>
            ))}
          </div>
        )}
      </div>
    </FloatingMenu>
  );
};

export default FloatingMenuWrapper;
