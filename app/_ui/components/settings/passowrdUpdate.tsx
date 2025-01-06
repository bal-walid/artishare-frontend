"use client";

import { userUpdatePasswordFields } from "@/app/_form/forms/userUpdate";
import { validationSchemaUserUpdatePassword } from "@/app/_form/validation/userUpdate";
import { useAuth } from "@/app/_hooks/useAuth";
import { UpdatePassword } from "@/app/_type/users";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../Input";

const fields = userUpdatePasswordFields;

export default function PasswordUpdate() {
  const { userPasswordUpdate } = useAuth();

  const formOptions = {
    resolver: yupResolver(validationSchemaUserUpdatePassword),
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePassword>(formOptions);

  const onSubmit = async (data: UpdatePassword) => {
    try {
      await userPasswordUpdate(data);
    } catch (error) {
      console.error("User update error:", error);
    }
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
              {fields.map((field) => (
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
