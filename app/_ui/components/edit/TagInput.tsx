import React, { useRef, useState } from "react";

const TagInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const refocusInput = () => {
    inputRef.current?.focus();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(inputValue ? e.target.value : e.target.value.slice(-1));
  }
  const focusAtStart = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!inputValue) {
      e.target.setSelectionRange(0, 0);
    }
   };
  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!inputValue) {
        e.preventDefault();
        if (tags.length) {
          setTags(tags.slice(0,-1))
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
        <span className="border border-opacity-10 mr-2 py-2 pl-2 pr-5 bg-white">{tag}</span>
      ))}
      <input
        value={inputValue || "Add a topic..."}
        onChange={handleInputChange}
        onFocus={focusAtStart}
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
