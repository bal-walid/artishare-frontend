"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
// import { Camera } from "lucide-react";
import { useAuthContext } from "@/app/contexts/AuthContext";

interface ProfileImageUploadProps {
  initialImage?: string;
  // onImageChange?: (file: File) => void;
}

export default function ProfileImageUpload({
  initialImage,
}: // onImageChange,
ProfileImageUploadProps) {
  const { user } = useAuthContext();
  const [preview] = useState<string | null>(
    "http://localhost:8000" + initialImage || null
  );

  if (!user) return null;

  return (
    <div className="relative group translate-y-2">
      <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
        <AvatarImage src={preview || ""} />
        <AvatarFallback className="text-4xl">
          {user.first_name}
          {user.last_name}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
