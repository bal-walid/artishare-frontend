import * as Yup from "yup";

const validationSchemaSignUp = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name can't be longer than 50 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name can't be longer than 50 characters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),

  //   imageUrl: Yup.mixed<FileList>()
  //     .required("Profile Image is required")
  //     .test(
  //       "fileSize",
  //       "File size must be less than or equal to 10MB",
  //       (value) => value && value[0]?.size <= 10 * 1024 * 1024 // 10MB size limit
  //     )
  //     .test("fileFormat", "Unsupported file format", (value) => {
  //       if (value && value?.length > 0) {
  //         const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];
  //         return supportedFormats.includes(value[0]?.type);
  //       }
  //       return false;
  //     }),
});

export { validationSchemaSignUp };
