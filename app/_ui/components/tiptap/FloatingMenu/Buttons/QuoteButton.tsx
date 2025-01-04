import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
interface CancelButtonProps {
  hideMenu: () => void;
}
const QuoteButton = ({ hideMenu }: CancelButtonProps) => {
  function onClick() {
    hideMenu();
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
