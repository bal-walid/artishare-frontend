"use client";

import { userUpdateFields } from "@/app/_form/forms/userUpdate";
import { validationSchemaUserUpdate } from "@/app/_form/validation/userUpdate";
import { UpdateUser } from "@/app/_type/users";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../Input";

import { useAuthContext } from "@/app/contexts/AuthContext";
import { useEffect } from "react";
const fields = userUpdateFields;
const firstlast_name = fields.filter(
  (field) => field.name === "first_name" || field.name === "last_name"
);
const otherFields = fields.filter(
  (field) => field.name !== "first_name" && field.name !== "last_name"
);

export default function PersonalInfoForm() {
  const { user, userUpdate } = useAuthContext();
  const defaultValues: UpdateUser = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
  };
  const formOptions = {
    resolver: yupResolver(validationSchemaUserUpdate),
    defaultValues,
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateUser>(formOptions);

  const onSubmit = async (data: UpdateUser) => {
    try {
      await userUpdate(data);
    } catch (error) {
      console.error("User update error:", error);
    }
  };
  useEffect(() => {
    reset({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
    });
  }, [reset, user]);
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
              {firstlast_name.map((field) => (
                <Input
                  key={field.id}
                  htmlFor={field.labelFor}
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  disabled={isSubmitting}
                  value={field.value}
                  labelText={field.labelText}
                  register={register}
                  name={field.name}
                  classNameInput=" border border-gray-300 rounded-md w-full px-3 py-2 h-10 outline-none focus:border-none"
                  error={errors[field.name]?.message}
                />
              ))}
            </div>

            <div className="grid gap-4 ">
              {otherFields.map((field) => (
                <Input
                  key={field.id}
                  htmlFor={field.labelFor}
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  disabled={isSubmitting}
                  labelText={field.labelText}
                  register={register}
                  name={field.name}
                  classNameInput=" border border-gray-300 w-full block   outline-none focus:border-none"
                  error={errors[field.name]?.message}
                />
              ))}
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
