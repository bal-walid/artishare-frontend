"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Camera } from "lucide-react";
import { useAuth } from "@/app/_hooks/useAuth";

interface ProfileImageUploadProps {
  initialImage?: string;
  // onImageChange?: (file: File) => void;
}

export default function ProfileImageUpload({
  initialImage,
}: // onImageChange,
ProfileImageUploadProps) {
  const { user } = useAuth();
  const [preview] = useState<string | null>(
    "http://localhost:8000" + initialImage || null
  );

  if (!user) return null;

  return (
    <div className="relative group">
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
