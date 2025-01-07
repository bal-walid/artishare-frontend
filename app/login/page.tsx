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
import loginFields from "../_form/forms/login";
import { validationSchemaLogin } from "../_form/validation/login";
import { login } from "../_type/auth";
import Input from "../_ui/components/Input";
import { useAuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { InternalServerError, UnauthorizedError } from "../_errors/main";

const fields = loginFields;
export default function LoginPage() {
  const [error, setError] = useState("");
  const { login } = useAuthContext();
  const router = useRouter();
  const formOptions = {
    resolver: yupResolver(validationSchemaLogin),
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<login>(formOptions);

  async function onSubmit(data: login) {
    try {
      console.log(data);
      console.log(await login(data.email, data.password));
      router.push('/blogs');
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setError("Credentials are invalid");
      }
      if (error instanceof InternalServerError) {
        setError("This email is not associated with an existing account");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-main">
      <Card className="w-full max-w-lg bg-hero-bg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-sm text-red-500 ml-6 h-6">{error || "  "}</div>
          <CardContent className="space-y-4">
            {fields.map((field) => (
              <Input
                key={field.name}
                name={field.name}
                htmlFor={field.labelFor}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                disabled={isSubmitting}
                register={register}
                labelText={field.labelText}
                error={errors[field.name]?.message}
              />
            ))}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up <ArrowRight className="inline h-4 w-4" />
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
