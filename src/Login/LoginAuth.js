import * as Yup from "yup";

export const loginAuth = Yup.object({
  email: Yup.string().email().required("Enter Your Hospital Email/Phone Number"),
  password: Yup.string().min(6).max(20).required("Hospital Name is required"),

  //repassword: Yup.string()
    //.required("Confirm password is required")
//.oneOf([Yup.ref("password"), null], "Password must match"),
});