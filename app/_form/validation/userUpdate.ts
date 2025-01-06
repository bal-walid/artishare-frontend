import * as Yup from "yup";

const validationSchemaUserUpdate = Yup.object().shape({
  first_name: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name can't be longer than 50 characters"),
  last_name: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name can't be longer than 50 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
});

const validationSchemaUserUpdatePassword = Yup.object().shape({
  current_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  new_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Password confirmation is required"),
});
export { validationSchemaUserUpdate, validationSchemaUserUpdatePassword };
