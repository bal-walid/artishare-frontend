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
  console.log(user);
  const [preview] = useState<string | null>(
    "http://localhost:8000" + initialImage || null
  );

  if (!user) return null;
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result as string);
  //       onImageChange?.(file);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="relative group">
      <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
        <AvatarImage src={preview || ""} />
        <AvatarFallback className="text-4xl">
          {user.first_name}
          {user.last_name}
        </AvatarFallback>
      </Avatar>
      {/* <label
        htmlFor="profile-image"
        className="absolute bottom-0 right-0 p-2 bg-primary rounded-full shadow-lg cursor-pointer
          opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Camera className="h-4 w-4 text-primary-foreground" />
        <input
          id="profile-image"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label> */}
    </div>
  );
}
