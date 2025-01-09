'use client'
import MainHeader from "@/app/_ui/components/blogList/MainHeader";
import UserTable from "../_ui/components/admin/UserTable";
import { fetchUsers, lockUser } from "../_network/users";
import { useEffect, useState } from "react";
import { User } from "../_type/users";

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(()=> {
    fetchUsers().then((users) => {
      setUsers(users.filter(user => user.role !== "admin"));
      setLoading(false);
    } )
  }, [])
  const toggleUserLock = async (userId: number) => {
    const updatedUser = await lockUser(userId);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, account_locked: updatedUser.user.account_locked } : user
      )
    );
  };
  return (
    <div className="h-full flex flex-col">
      <MainHeader
        isSearchPage={false}
      />
      <main className="flex-1 flex justify-evenly overflow-y-auto overflow-x-hidden p-8">
        {loading ? <p>Loading...</p> : <UserTable toggleLock={toggleUserLock} users={users}/>}
      </main>
    </div>
  );
}