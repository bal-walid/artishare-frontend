import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import { Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ButtonItalicProps {
  editor: Editor;
  hideMenu: () => void;
}

const VideoButton = ({ editor, hideMenu }: ButtonItalicProps) => {
  const [showInput, setShowInput] = useState(false);
  const [src, setSrc] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSrc(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (src) {
      editor
        .chain()
        .setYoutubeVideo({
          src: src,
        })
        .run();
      hideMenu();
    }
    setShowInput(false);
    setSrc("");
  };

  useEffect(() => {
    const handleUpdate = () => {
      if (!editor.isActive("link")) {
        setShowInput(false);
      }
    };

    editor.on("update", handleUpdate);
  }, [editor]);

  useEffect(() => {
    const handleUpdate = () => {
      if (!editor.isActive("link")) {
        setShowInput(false);
      }
    };

    editor.on("update", handleUpdate);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      editor.off("update", handleUpdate);
    };
  }, [editor]);

  return (
    <div className="relative flex justify-center items-center">
      <Button
        key={"video"}
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8 rounded-full hover:bg-muted ")}
        onClick={handleClick}
        aria-label={"video"}
      >
        <Video className="h-5 w-5" strokeWidth={1.5} />
      </Button>
      {showInput && (
        <div className="absolute bottom-full right-full z-50" ref={inputRef}>
          <form
            onSubmit={handleInputSubmit}
            className="flex items-center gap-2   bubble-menu p-2 shadow-lg"
          >
            <Input
              type="url"
              value={src}
              onChange={handleInputChange}
              placeholder="Paste or type a link"
              className="min-w-[300px] text-primary ring-ring border-0 ring-1 "
              autoFocus
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default VideoButton;
