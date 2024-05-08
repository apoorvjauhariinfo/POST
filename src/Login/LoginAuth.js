import * as Yup from "yup";

export const loginAuth = Yup.object({
  email: Yup.string().email().required("Enter Your Email"),
  password: Yup.string().min(8).max(20).required("Enter Your Password"),

  //repassword: Yup.string()
    //.required("Confirm password is required")
//.oneOf([Yup.ref("password"), null], "Password must match"),
});