"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Input from "../_ui/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import signUpFields from "../_form/forms/signup";
import { validationSchemaSignUp } from "../_form/validation/signup";
import { useAuth } from "../_hooks/useAuth";
import { signUp } from "../_type/auth";
const fields = signUpFields;
const imageField = fields.find((field) => field.name === "profile_image");
const firstlast_name = fields.filter(
  (field) => field.name === "first_name" || field.name === "last_name"
);
const otherFields = fields.filter(
  (field) =>
    field.name !== "first_name" &&
    field.name !== "last_name" &&
    field.name !== "profile_image"
);
export default function SignUpPage() {
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const formOptions = {
    resolver: yupResolver(validationSchemaSignUp),
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // watch,
  } = useForm<signUp>(formOptions);

  async function onSubmit(data: signUp) {
    try {
      console.log(data);
      console.log(await signup(data));
    } catch (error) {
      setError((error as Error).message);
    }
  }
  if (!imageField) return null;
  // // Use watch to monitor form values
  // const formValues = watch(); // Returns all form field values
  // console.log("Form Values:", formValues);
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-main">
      <Card className="w-full min-h-[65vh] space-y-3 bg-hero-bg max-w-lg">
        <CardHeader className="space-y-3 pt-10">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your information to create a new account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="text-sm text-red-500 ml-5">{error}</div>}
          <CardContent className="space-y-5">
            <Input
              key={imageField?.id}
              htmlFor={imageField?.labelFor}
              type={imageField?.type}
              placeholder={imageField?.placeholder}
              required
              disabled={isSubmitting}
              labelText={imageField?.labelText}
              register={register}
              name={imageField?.name}
              error={errors[imageField?.name]?.message}
            />
            <div className="grid grid-cols-2 gap-4">
              {firstlast_name.map((field) => (
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
                  error={errors[field.name]?.message}
                />
              ))}
            </div>
            {otherFields.map((field) => (
              <Input
                key={field.name}
                name={field.name}
                htmlFor={field.labelFor}
                type={field.type}
                placeholder={field.placeholder}
                required
                disabled={isSubmitting}
                labelText={field.labelText}
                register={register}
                error={errors[field.name]?.message}
              />
            ))}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create account
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login <ArrowRight className="inline h-4 w-4" />
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
