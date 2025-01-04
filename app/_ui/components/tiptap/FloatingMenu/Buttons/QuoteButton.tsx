import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
import CommandButton from "../../BubbleMenu/Buttons/CommandButton";
import { useCurrentEditor } from "@tiptap/react";

const QuoteButton = () => {
  const {editor} = useCurrentEditor();
  function onClick() {
    if (editor) {
      editor.chain().focus().toggleBlockquote().run();
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
      <Quote className="h-5 w-5" strokeWidth={1.5} />
    </Button>
  );
};

export default QuoteButton;
