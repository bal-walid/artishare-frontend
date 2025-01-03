import { FloatingMenu, useCurrentEditor } from "@tiptap/react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/app/_ui/stylesheets/floating-menu.css"

const FloatingMenuWrapper = () => {
  const {editor} = useCurrentEditor();
  if (!editor) return null;
  return (
    <FloatingMenu tippyOptions={{placement:"left"}} className="floating-menu p-2" editor={editor}>
      <Button variant={"mediumLike"} className="p-0">
        <PlusCircle className="!h-9 !w-9" strokeWidth={0.5}/>
      </Button>
    </FloatingMenu>
  );
}
export default FloatingMenuWrapper;