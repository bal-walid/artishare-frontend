import { useRef, useState } from "react";

const TagInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const refocusInput = () => {
    inputRef.current?.focus();
  };
  return (
    <div
      onClick={refocusInput}
      className="bg-[#fafafa] mt-2 pl-6 py-4 border border-black border-opacity-15 text-sm"
    >
      <input
        value={inputValue || 'Add a topic...'}
        onChange={(e) => setInputValue(inputValue ? e.target.value : e.target.value.slice(-1))}
        ref={inputRef}
        className={"outline-none bg-transparent text-black text-opacity-80" + (!inputValue ? ' text-opacity-50' : '')}
      />
    </div>
  );
};
export default TagInput;
