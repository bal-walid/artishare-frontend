import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Input as InputShadcn } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputFile from "./InputFile";

interface InputProps {
  htmlFor: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  labelText?: string;
  value?: string | number;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  classNameLabel?: string;
  classNameInput?: string;
  classNameContainer?: string;
  [x: string]: unknown;
}

const Input = ({
  htmlFor,
  type,
  placeholder,
  required,
  disabled,
  register,
  error,
  classNameLabel,
  classNameInput,
  classNameContainer,
  name,
  value,
  labelText,
  ...rest
}: InputProps) => {
  return type !== "file" ? (
    <InputBasic
      {...{
        htmlFor,
        type,
        placeholder,
        required,
        disabled,
        register,
        error,
        classNameLabel,
        classNameInput,
        classNameContainer,
        name,
        value,
        labelText,
        ...rest,
      }}
    />
  ) : (
    <InputFile
      {...{
        htmlFor,
        type,
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
        ...rest,
      }}
    />
  );
};
const InputBasic = ({
  htmlFor,
  type,
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
}: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={"space-y-2 " + classNameContainer}>
      {labelText && (
        <Label htmlFor={htmlFor} className={classNameLabel}>
          {labelText}
        </Label>
      )}
      <div className="relative">
        <InputShadcn
          id={htmlFor}
          type={showPassword && type === "password" ? "text" : type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          {...register(name)}
          className={classNameInput}
          {...rest}
        />
        {type === "password" && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        )}
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default Input;
