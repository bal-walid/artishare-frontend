import { Label } from "@radix-ui/react-label";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Input as InputShadcn } from "@/components/ui/input";
interface InputProps {
  htmlFor: string;
  type: string;
  placeholder: string;
  required?: boolean;
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
  ...rest
}: InputProps) => {
  return (
    <div className={"space-y-2 marker:" + classNameContainer}>
      <Label htmlFor={htmlFor} className={classNameLabel}>
        {placeholder}
      </Label>
      <InputShadcn
        id={htmlFor}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        {...register(htmlFor)}
        className={classNameInput}
        {...rest}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
