"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import { LockIcon, LockOpenIcon } from "lucide-react";

import { User } from "@/app/_type/users";
import { capitalize } from "@/lib/capitalize";
import formatDate from "@/lib/formatDate";
import { serverAddress } from "@/app/_config/main";

interface UserTableProps {
  users: User[];
  toggleLock:  (userId: number) => Promise<void>;
}

export default function UserTable({ users, toggleLock }: UserTableProps) {
  const handleLock = async (e : React.MouseEvent, userId: number) => {
    e.currentTarget.classList.add("opacity-50", "cursor-not-allowed");
    await toggleLock(userId);
  };

  return (
    <ScrollArea className="max-h-full w-full border-2 rounded-md">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead className="w-[50px]">Avatar</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Account Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={serverAddress + user.profile_image} />
                  <AvatarFallback>
                    {user.first_name.slice(0, 1).toUpperCase() +
                      user.last_name.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">
                {capitalize(user.first_name) + " " + capitalize(user.last_name)}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{formatDate(user.created_at)}</TableCell>
              <TableCell>{user.account_locked ? "Locked" : "Active"}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant={user.account_locked ? "success" : "destructive"}
                  size="sm"
                  className="w-1/2"
                  onClick={(e) => handleLock(e, user.id)}
                  // disabled={user.accountStatus === "Suspended"}
                >
                  {user.account_locked ? (
                    <>
                      <LockOpenIcon className="w-4 h-4 mr-2" /> Unlock
                    </>
                  ) : (
                    <>
                      <LockIcon className="w-4 h-4 mr-2" />
                      Lock
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
