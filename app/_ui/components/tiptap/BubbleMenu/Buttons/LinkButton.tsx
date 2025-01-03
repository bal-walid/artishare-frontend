import { Input } from "@/components/ui/input";
import { ChainedCommands, Editor } from "@tiptap/react";
import { useState } from "react";
import CommandButton from "./CommandButton";

interface ButtonItalicProps {
  editor: Editor;
  children: React.ReactNode;
}

const LinkButton = ({ editor, children }: ButtonItalicProps) => {
  const [showInput, setShowInput] = useState(false);
  const [url, setUrl] = useState("");

  const command = (chain: ChainedCommands) => {
    if (editor.isActive("link")) {
      setShowInput(false);
      return chain.extendMarkRange("link").unsetLink();
    }
    setShowInput(true);
    return chain;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      editor.chain().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().toggleLink({ href: url }).run();
    }
    setShowInput(false);
    setUrl("");
  };

  const isActiveParams = { name: "link" };

  return (
    <div className="relative flex justify-center items-center">
      <CommandButton
        editor={editor}
        command={command}
        isActiveParams={isActiveParams}
      >
        {children}
      </CommandButton>
      {showInput && (
        <div className="absolute bottom-full right-full z-50">
          <form
            onSubmit={handleInputSubmit}
            className="flex items-center gap-2   bubble-menu p-2 shadow-lg"
          >
            <Input
              type="url"
              value={url}
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

export default LinkButton;
