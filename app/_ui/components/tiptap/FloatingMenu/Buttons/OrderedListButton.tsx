import { useCurrentEditor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListOrdered } from "lucide-react";


const OrderedListButton = () => {
  const {editor} = useCurrentEditor();
  function onClick() {
    if (editor) {
      editor.chain().focus().toggleOrderedList().run();
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
      <ListOrdered className="h-5 w-5" strokeWidth={1.5} />
    </Button>
  );
};

export default OrderedListButton;
