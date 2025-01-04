"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import { Image } from "lucide-react";


interface ImageButtonProps {
  hideMenu: () => void;
}

const ImageButton = ({ hideMenu }: ImageButtonProps) => {
  const { editor } = useCurrentEditor();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (editor) {
          editor.chain().focus().setImage({ src: result }).run();
        }
      };
      reader.readAsDataURL(file);
      hideMenu();
    }
  };

  return (
    <div className="relative">
      <Button
        key={"image"}
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8 rounded-full hover:bg-muted ")}
        onClick={() => document.getElementById("file-input")?.click()}
        aria-label={"image"}
      >
        <Image className="h-5 w-5" strokeWidth={1.5} />
      </Button>
      <input
        type="file"
        id="file-input"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageButton;
