import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Code2 } from "lucide-react";
interface CancelButtonProps {
  hideMenu: () => void;
}
const CodeButton = ({ hideMenu }: CancelButtonProps) => {
  function onClick() {
    hideMenu();
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