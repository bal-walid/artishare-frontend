import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";
interface CancelButtonProps {
  hideMenu: () => void;
}
const ImageButton = ({ hideMenu }: CancelButtonProps) => {
  function onClick() {
    hideMenu();
  }
  return (
    <Button
      key={"image"}
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 rounded-full hover:bg-muted ")}
      onClick={onClick}
      aria-label={"image"}
    >
      <Image className="h-5 w-5"  strokeWidth={1.5} />
    </Button>
  );
};

export default ImageButton;
