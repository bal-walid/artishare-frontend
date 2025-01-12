import * as Yup from "yup";

const validationSchemaSignUp = Yup.object().shape({
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
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),

    profile_image: Yup.mixed<FileList>()
    .required("Profile Image is required")
    .test(
      "fileSize",
      "File size must be less than or equal to 10Mb",
      (value) => {
        if (value && value[0]) {
          return value[0].size <= 10 * 1024 * 1024; // 10MB size limit
        }
        return false;
      }
    )
    .test("fileFormat", "Unsupported file format", (value) => {
      if (value && value?.length > 0) {
        return value[0]?.type.startsWith("image/");
      }
      return false;
    }),
});

export { validationSchemaSignUp };
