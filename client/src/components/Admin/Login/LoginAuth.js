import * as Yup from "yup";

export const loginAuth = Yup.object({
  email: Yup.string().required("Enter Your Email"),
  password: Yup.string().required("Enter Your Password"),
});