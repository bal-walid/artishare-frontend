"use client";
import { saveImage } from "@/app/_network/blogs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import { Image } from "lucide-react";

interface ImageButtonProps {
  hideMenu: () => void;
}

const ImageButton = ({ hideMenu }: ImageButtonProps) => {
  const { editor } = useCurrentEditor();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const form = new FormData();
    if (file) {
      form.append("blog_image", file);
      try {
        // Save the image to the database and get the URL
        const imageUrl = await saveImage(form);
        const imageFullPath = "http://localhost:8000" + imageUrl.url;
        // Update the editor with the image URL
        if (editor) {
          editor.chain().focus().setImage({ src: imageFullPath }).run();
        }

        // Hide the menu
        hideMenu();
      } catch (error) {
        console.error("Error saving image:", error);
      }
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
