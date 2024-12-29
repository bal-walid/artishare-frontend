import { login } from "@/app/_type/auth";
import Base from "./base";

type LoginFields = Base<login>;

const loginFields: LoginFields[] = [
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
];
export default loginFields;
