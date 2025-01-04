import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
interface CancelButtonProps {
  hideMenu: () => void;
}
const CancelButton = ({ hideMenu }: CancelButtonProps) => {
  function onClick() {
    hideMenu();
  }
  return (
    <Button
      key={"cancel"}
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
      )}
      onClick={onClick}
      aria-label={"cancel"}
    >
      <X className="h-5 w-5" strokeWidth={1.5} />
    </Button>
  );
};

export default CancelButton;
