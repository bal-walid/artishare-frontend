export interface login {
  email: string;
  password: string;
}
export interface signUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  profile_image: FileList;
}
