import { useCurrentEditor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface UnorderedListButtonProps {
  hideMenu: () => void;
}

const UnorderedListButton = ({ hideMenu }: UnorderedListButtonProps) => {
  const {editor} = useCurrentEditor();
  function onClick() {
    if (editor) {
      editor.chain().focus().toggleBulletList().run();
      hideMenu();
    }
  }
  return (
    <Button
      key={"quote"}
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 rounded-full hover:bg-muted ")}
      onClick={onClick}
      aria-label={"quote"}
    >
      <List className="h-5 w-5" strokeWidth={1.5} />
    </Button>
  );
};

export default UnorderedListButton;
