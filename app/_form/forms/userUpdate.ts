import Base from "./base";
import { UpdatePassword, UpdateUser } from "@/app/_type/users";

type UserUpdateFields = Base<UpdateUser>;
type UserUpdatePasswordFields = Base<UpdatePassword>;
const userUpdateFields: UserUpdateFields[] = [
  {
    labelText: "Email",
    labelFor: "email",
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Entre your email",
  },
  {
    labelText: "First Name",
    labelFor: "first_name",
    id: "first_name",
    name: "first_name",
    type: "text",
    placeholder: "Enter your first name",
  },
  {
    labelText: "Last Name",
    labelFor: "last_name",
    id: "last_name",
    name: "last_name",
    type: "text",
    placeholder: "Enter your last name",
  },
];
const userUpdatePasswordFields: UserUpdatePasswordFields[] = [
  {
    labelText: "Old Password",
    labelFor: "current_password",
    id: "current_password",
    name: "current_password",
    type: "password",
    placeholder: "Enter your old password",
  },
  {
    labelText: "New Password",
    labelFor: "new_password",
    id: "new_password",
    name: "new_password",
    type: "password",
    placeholder: "Enter your new password",
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm_password",
    id: "confirm_password",
    name: "confirm_password",
    type: "password",
    placeholder: "Confirm your new password",
  },
];
export { userUpdateFields, userUpdatePasswordFields };
