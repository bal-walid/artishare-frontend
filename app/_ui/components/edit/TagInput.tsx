import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useRef, useState } from "react";

const TagInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const refocusInput = () => {
    inputRef.current?.focus();
  };
  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!inputValue) {
        if (tags.length) {
          setTags(tags.slice(0, -1));
        }
      }
    }
    if (e.key === "Enter") {
      if (tags.includes(inputValue)) {
        setInputValue("");
        return;
      }
      setTags((tags) => [...tags, inputValue.trim()]);
      setInputValue("");
    }
  };
  return (
    <div
      onClick={refocusInput}
      className="bg-[#fafafa] mt-2 pl-6 py-4 border border-black border-opacity-15 text-sm"
    >
      {tags.map((tag) => (
        <span key={tag} className="inline-flex items-center border border-opacity-10 mr-2 py-2 pl-2 pr-5 bg-white">
          {tag}{" "}
          <Button variant={"mediumLike"}>
            <X className="!h-4 !w-4" />
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
