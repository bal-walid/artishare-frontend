import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import { Code2 } from "lucide-react";

interface CodeButtonProps {
  hideMenu: () => void;
}

const CodeButton = ({ hideMenu }: CodeButtonProps) => {
  const {editor} = useCurrentEditor();
  function onClick() {
    if (editor) {
      editor.chain().focus().toggleCodeBlock().run();
      hideMenu();
    }
  }
  return (
    <Button
      key={"code"}
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 rounded-full hover:bg-muted ")}
      onClick={onClick}
      aria-label={"code"}
    >
      <Code2 className="h-5 w-5" strokeWidth={1.5} />
    </Button>
  );
};

export default CodeButton;
