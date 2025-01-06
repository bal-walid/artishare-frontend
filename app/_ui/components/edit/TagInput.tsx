import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useRef, useState } from "react";

interface TagInputProps {
  tags : string[];
  addTag: (tag: string) => void;
  deleteTag : (tag: string) => void;
}

const TagInput = ({tags, addTag, deleteTag} : TagInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const refocusInput = () => {
    inputRef.current?.focus();
  };
  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!inputValue) {
        if (tags.length) {
          deleteTag(tags[tags.length - 1]);
        }
      }
    }
    if (e.key === "Enter") {
      if (tags.includes(inputValue)) {
        setInputValue("");
        return;
      }
      addTag(inputValue);
      setInputValue("");
    }
  };
  return (
    <div
      onClick={refocusInput}
      className="min-h-16 bg-[#fafafa] mt-2 pl-6 py-4 border border-black border-opacity-15 text-sm flex flex-wrap gap-y-2"
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-sm text-xs relative gap-2 items-baseline border border-opacity-10 mr-2 py-2 pl-3 pr-6 bg-white"
        >
          <span>{tag}</span>
          <Button
            onClick={() => deleteTag(tag)}
            className="p-0 h-auto absolute top-1/2 -translate-y-1/2 right-0 pr-1"
            variant={"mediumLike"}
          >
            <X className="!h-3 !w-3" />
          </Button>{" "}
        </span>
      ))}
      <input
        value={inputValue}
        placeholder="Add a topic..."
        onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef}
        className={
          "outline-none bg-transparent text-black text-opacity-80" +
          (!inputValue ? " text-opacity-50" : "")
        }
        onKeyDown={handleTags}
      />
    </div>
  );
};
export default TagInput;
