import { signUp } from "@/app/_type/auth";
import Base from "./base";

type SignUpFields = Base<signUp>;
const signUpFields: SignUpFields[] = [
  {
    labelText: "First Name",
    labelFor: "first_name",
    id: "first_name",
    name: "first_name",
    type: "text",
    placeholder: "Entre your First Name",
  },
  {
    labelText: "Last Name",
    labelFor: "last_name",
    id: "last_name",
    name: "last_name",
    type: "text",
    placeholder: "Entre your Last Name",
  },
  {
    labelText: "Email",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Entre your email",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Entre your password",
  },
  {
    labelText: "Password Confirmation",
    labelFor: "password_confirmation",
    id: "password_confirmation",
    name: "password_confirmation",
    type: "password",
    placeholder: "Entre your password",
  },
];

export default signUpFields;
