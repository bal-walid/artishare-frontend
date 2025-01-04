import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Video } from "lucide-react";
interface CancelButtonProps {
  hideMenu: () => void;
}
const VideoButton = ({ hideMenu }: CancelButtonProps) => {
  function onClick() {
    hideMenu();
  }
  return (
    <Button
      key={"video"}
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 rounded-full hover:bg-muted ")}
      onClick={onClick}
      aria-label={"video"}
    >
      <Video className="h-5 w-5" strokeWidth={1.5} />
    </Button>
  );
};

export default VideoButton;
