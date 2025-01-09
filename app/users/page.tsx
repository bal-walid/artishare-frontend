"use client";
import MainHeader from "@/app/_ui/components/blogList/MainHeader";
import UserTable from "../_ui/components/admin/UserTable";
import { fetchUsers, lockUser } from "../_network/users";
import { useEffect, useState } from "react";
import { User } from "../_type/users";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams);
  useEffect(() => {
    fetchUsers().then((users) => {
      setUsers(users.filter((user) => user.role !== "admin"));
      setFilteredUsers(users.filter((user) => user.role !== "admin"));
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    if (searchParams.has("query")) {

        setFilteredUsers(
          users.filter((user) => {
            return (
              user.first_name
                .toLowerCase()
                .includes(searchParams.get("query")) ||
              user.last_name
                .toLowerCase()
                .includes(searchParams.get("query")) ||
              user.email.toLowerCase().includes(searchParams.get("query"))
            );
          })
        );
        setLoading(false);
      }
    }
  , [searchParams]);
  const toggleUserLock = async (userId: number) => {
    const updatedUser = await lockUser(userId);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, account_locked: updatedUser.user.account_locked }
          : user
      )
    );
  };
  const handleSearch = () => {
    const search = input.toLowerCase();
    router.push(`/users?query=${encodeURIComponent(search)}`);
  };
  return (
    <div className="h-full flex flex-col">
      <MainHeader isSearchPage={false} />
      <main className="flex-1 flex flex-col gap-3 overflow-y-auto overflow-x-hidden p-8">
        <div className="flex relative w-fit">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search by first name, last name, or email..."
            className="text-sm px-4 py-2 h-full shadow-sm border rounded-md w-[350px] focus:outline-primary"
          />
          <Button
            onClick={handleSearch}
            className="h-full absolute right-0 px-1 shadow-none !rounded-md"
          >
            {" "}
            <SearchIcon />
          </Button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <UserTable toggleLock={toggleUserLock} users={filteredUsers} />
        )}
      </main>
    </div>
  );
}
