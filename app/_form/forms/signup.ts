import { signUp } from "@/app/_type/auth";
import Base from "./base";

type SignUpFields = Base<signUp>;
const signUpFields: SignUpFields[] = [
  {
    labelText: "Your First Name",
    labelFor: "firstName",
    id: "firstName",
    name: "firstName",
    type: "text",
    placeholder: "Entre your First Name",
  },
  {
    labelText: "Your Last Name",
    labelFor: "lastName",
    id: "lastName",
    name: "lastName",
    type: "text",
    placeholder: "Entre your Last Name",
  },
  {
    labelText: "Your email",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Entre your email",
  },
  {
    labelText: "Your password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Entre your password",
  },
  {
    labelText: "Confirm Your password",
    labelFor: "confirmPassword",
    id: "confirmPassword",
    name: "password_confirmation",
    type: "password",
    placeholder: "Entre your password",
  },
];

export default signUpFields;
