"use client";

import { useAuth } from "@/app/_hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePhotoForm() {
  const { user, userImageUpdate } = useAuth();
  const [preview, setPreview] = useState<string | null>(
    user?.profile_image ? `http://localhost:8000${user.profile_image}` : null
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    try {
      if (file && user) {
        const formData = new FormData();
        formData.append("profile_image", file);
        await userImageUpdate(formData);
      }
    } catch (error) {
      console.error("Image update error:", error);
    }
  };

  useEffect(() => {
    if (user?.profile_image) {
      setPreview(`http://localhost:8000${user.profile_image}`);
    } else {
      setPreview(null);
    }
  }, [user]);

  if (!user) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Profile Photo</h2>
          <div className="flex items-center gap-8">
            <div className="relative h-24 w-24">
              <Image
                src={preview || "/default-profile.png"} // Provide a default fallback image
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("profileImage")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Change photo
              </Button>
              <input
                id="profileImage"
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleImageChange}
              />
              <p className="text-sm text-muted-foreground">
                JPG, GIF, or PNG. Max size of 4MB.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
