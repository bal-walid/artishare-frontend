"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { Input as InputShadcn } from "@/components/ui/input";
interface ImageUploadProps {
  htmlFor: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  labelText?: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  classNameLabel?: string;
  classNameInput?: string;
  classNameContainer?: string;
  [x: string]: unknown;
}

export default function InputFile({
  htmlFor,
  placeholder,
  required,
  disabled,
  register,
  error,
  classNameLabel,
  classNameInput,
  classNameContainer,
  name,
  labelText,
  ...rest
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={"flex flex-col items-center space-y-4 " + classNameContainer}
    >
      <Avatar className="h-24 w-24">
        <AvatarImage src={preview || ""} />
        <AvatarFallback>
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={"relative " + classNameLabel}
          onClick={() => document.getElementById(name)?.click()}
        >
          {labelText}
          <InputShadcn
            id={htmlFor}
            {...rest}
            type={"file"}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            {...register(name, {
              onChange: handleImageChange,
            })}
            className={"hidden " + classNameInput}
          />
        </Button>
        {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
      </div>
    </div>
  );
}
