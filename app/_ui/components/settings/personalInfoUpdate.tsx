"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function PersonalInfoForm() {
  const { register, handleSubmit } = useForm<PersonalInfoFormData>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    },
  });

  const onSubmit = async (data: PersonalInfoFormData) => {
    console.log("Updating personal info:", data);
    // Handle personal info update
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <p className="text-sm text-muted-foreground">
                Update your personal details here.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  className="bg-background"
                  {...register("firstName")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  className="bg-background"
                  {...register("lastName")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="bg-background"
                {...register("email")}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="sm">
                Update Information
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
