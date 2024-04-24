import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const registrationSchema = Yup.object({
  email: Yup.string().email().required("Email id is required"),
  hospitalname: Yup.string().min(3).required("Hospital Name is required"),
  //registeras: Yup.string().min(6).max(20).required("Please Select Register Type"),
  address: Yup.string().min(3).required("Please enter Hospital address"),
  firstname: Yup.string().min(3).required("Please enter your First Name"),
  lastname: Yup.string().min(3).required("Please enter your Last Name"),
  phone: Yup.string()
  .required("required")
  .matches(phoneRegExp, 'Phone number is not valid')
  .min(10, "too short")
  .max(10, "too long"),
  state: Yup.string().min(2).required("Please enter your State"),
  district: Yup.string().min(3).required("Please enter your District"),
  landmark: Yup.string().min(3).required("Your Nearest Landscape"),
  pincode: Yup.string().min(6).required("Please enter your PIN Code"),
  password: Yup.string().min(6).required("Please enter valid Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  agreeTerms: Yup.boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions")

  //repassword: Yup.string()
    //.required("Confirm password is required")
//.oneOf([Yup.ref("password"), null], "Password must match"),
});