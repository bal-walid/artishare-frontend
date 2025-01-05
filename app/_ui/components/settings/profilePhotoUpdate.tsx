"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";

interface ProfilePhotoFormData {
  profileImage: string;
  profileImageFile: File | null;
}

export default function ProfilePhotoForm() {
  const { register, handleSubmit } = useForm<ProfilePhotoFormData>({
    defaultValues: {
      profileImage: "/placeholder.svg",
      profileImageFile: null,
    },
  });

  const onSubmit = async (data: ProfilePhotoFormData) => {
    console.log("Updating profile photo:", data);
    // Handle profile photo update
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle image change
      console.log("New image selected:", file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Profile Photo</h2>
            <div className="flex items-center gap-6">
              <div className="relative h-24 w-24">
                <Image
                  src="/placeholder.svg"
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
                  onClick={() =>
                    document.getElementById("profileImage")?.click()
                  }
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Change photo
                </Button>
                <input
                  id="profileImage"
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/gif"
                  {...register("profileImageFile")}
                  onChange={handleImageChange}
                />
                <p className="text-sm text-muted-foreground">
                  JPG, GIF or PNG. Max size of 2MB.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="sm">
                Update Photo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
