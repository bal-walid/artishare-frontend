import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { HelpCircleIcon } from "lucide-react";

const EditHeader = () => {
  return (
    <nav className="flex justify-center px-5 pt-4">
      <div className="w-full max-w-[1024px] flex justify-between">
        <Logo className={"text-main bg-white text-4xl"}></Logo>
        <div className="flex items-center gap-6">
          <Button
            className="p-0 rounded-full py-1 px-3 text-sm h-auto font-normal"
            variant={"success"}
          >
            Publish
          </Button>
          <Button className="w-auto h-auto p-0" variant={"mediumLike"}>
            <HelpCircleIcon strokeWidth={2} className="!h-6 !w-6" />
          </Button>
          <Button variant={"ghost"} size="icon" className="rounded-full">
            <Avatar className="border border-secondary h-8 w-8">
              <AvatarImage
                src="/avatar_placeholder.png"
                alt="Profile picture"
              />
            </Avatar>
          </Button>
        </div>
      </div>
    </nav>
  );
};
export default EditHeader;
