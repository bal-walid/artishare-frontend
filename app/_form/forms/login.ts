import { login } from "@/app/_type/auth";
import Base from "./base";

type LoginFields = Base<login>;

const loginFields: LoginFields[] = [
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
];
export default loginFields;
