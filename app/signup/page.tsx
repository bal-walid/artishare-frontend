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
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import signUpFields from "../_form/forms/signup";
import { validationSchemaSignUp } from "../_form/validation/signup";
import { signUp } from "../_type/auth";
import Input from "../_ui/components/Input";
import { AuthGuard, useAuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
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
  const { signup } = useAuthContext();
  const router = useRouter();
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
      await signup(data);
      router.push("/blogs");
    } catch (error) {
      setError((error as Error).message);
    }
  }
  if (!imageField) return null;
  return (
    <AuthGuard requireAuth={false}>
      <div className="h-full flex items-center justify-center bg-hero-bg overflow-y-auto">
        <Card className="w-fit max-[400px]:w-[90%] max-sm:w-3/4   bg-white flex flex-col">
          <CardHeader className=" pt-5">
            <CardTitle className="text-2xl font-bold text-main">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your information to create a new account
            </CardDescription>
          </CardHeader>
          <form
            className="flex-1 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            {error && <div className="text-sm text-red-500 ml-5">{error}</div>}
            <CardContent className="gap-3">
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
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 mt-4 mb-2">
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
                    classNameContainer="space-y-2"
                  />
                ))}
              </div>
              {otherFields.map((field) => (
                <Input
                  classNameContainer="mb-2"
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
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create account
              </Button>
              <div className="text-sm text-center text-muted-foreground mt-2 flex gap-2 max-[400px]:flex-col">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Login <ArrowRight className="inline h-4 w-4" />
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AuthGuard>
  );
}
