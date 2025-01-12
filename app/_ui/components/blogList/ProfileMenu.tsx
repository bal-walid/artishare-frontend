import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User as UserIcon, Settings, LogOut, PenSquareIcon } from "lucide-react";
import Link from "next/link";
import { serverAddress } from "@/app/_config/main";
import { User } from "@/app/_type/users";
import Logo from "../Logo";

interface ProfileMenuProps {
  user: User | null;
  isEditMode: boolean;
  handleLogOut: () => void;
}

const ProfileMenu = ({
  user,
  isEditMode,
  handleLogOut,
}: ProfileMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-10 w-10 p-0.5 hover:bg-primary/5 transition-colors"
        >
          <Avatar
            className={`h-full w-full border-2 ${
              isEditMode
                ? "border-secondary"
                : "border-border hover:border-main/50"
            } transition-colors`}
          >
            <AvatarImage
              src={serverAddress + user?.profile_image}
              alt={user?.first_name}
            />
            <AvatarFallback className="bg-primary/5 text-sm font-medium">
            {user ? (user?.first_name.slice(0, 1).toUpperCase() + user?.last_name.slice(0, 1).toUpperCase()) : "AA"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal p-2">
          <Logo className="text-main text-lg mb-2 text-center"/>
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-semibold">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2 md:hidden" />
        <DropdownMenuGroup>
        <DropdownMenuItem className="md:hidden" asChild>
            <Link
              href="/create"
              className="flex items-center cursor-pointer p-2 rounded-md"
            >
              <PenSquareIcon className="mr-3 h-4 w-4" />
              <span>Write</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex items-center cursor-pointer p-2 rounded-md"
            >
              <UserIcon className="mr-3 h-4 w-4" />
              <span>View profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/profile/settings"
              className="flex items-center cursor-pointer p-2 rounded-md"
            >
              <Settings className="mr-3 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem
          onClick={handleLogOut}
          className="p-2 rounded-md text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;