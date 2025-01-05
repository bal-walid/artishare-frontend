"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function PasswordUpdate() {
  const { register, handleSubmit } = useForm<PasswordUpdateData>();

  const onSubmit = async (data: PasswordUpdateData) => {
    console.log("Updating password:", data);
    // Handle password update
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Security</h2>
              <p className="text-sm text-muted-foreground">
                Update your password here.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="bg-background"
                  {...register("currentPassword")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="bg-background"
                  {...register("newPassword")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="bg-background"
                  {...register("confirmPassword")}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="sm">
                Update Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
