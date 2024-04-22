import * as Yup from "yup";

export const registrationSchema = Yup.object({
  email: Yup.string().email().required("Email id is required"),
  hospitalname: Yup.string().min(3).required("Hospital Name is required"),
  //registeras: Yup.string().min(6).max(20).required("Please Select Register Type"),
  address: Yup.string().min(3).required("Please enter Hospital address"),
  firstname: Yup.string().min(3).required("Please enter your First Name"),
  lastname: Yup.string().min(3).required("Please enter your Last Name"),
  phone: Yup.number().min(10).max(10).required("Please enter Hospital phone number"),
  state: Yup.string().min(2).required("Please enter your State"),
  district: Yup.string().min(3).required("Please enter your District"),
  landmark: Yup.string().min(3).required("Your Nearest Landscape"),
  pincode: Yup.string().min(6).required("Please enter your PIN Code"),
  password: Yup.string().min(6).required("Please enter valid Password"),
  confirmPassword: Yup.string()
  .required("Confirm Password is required")
  .oneOf([Yup.ref("password"), null], "Passwords must match"),
  

  //repassword: Yup.string()
    //.required("Confirm password is required")
//.oneOf([Yup.ref("password"), null], "Password must match"),
});