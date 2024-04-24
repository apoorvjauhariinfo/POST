import * as Yup from "yup";

export const loginAuth = Yup.object({
  email: Yup.string().min(4).max(4).required("Enter Your Code"),


  //repassword: Yup.string()
    //.required("Confirm password is required")
//.oneOf([Yup.ref("password"), null], "Password must match"),
});