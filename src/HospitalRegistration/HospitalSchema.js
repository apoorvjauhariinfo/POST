import * as Yup from "yup";

export const registrationSchema = Yup.object({
  email: Yup.string().email().required("Email id is required"),
  hospitalname: Yup.string().min(6).max(20).required("Hospital Name is required"),
  billingname: Yup.string().min(6).max(20).required("Billing Name is required"),
  address: Yup.string().min(6).required("Please enter Hospital address"),
  ceanumber: Yup.string().min(6).required("Please enter your CEA Number"),
  phone: Yup.number().min(10).required("Please provide Valid Number"),
  state: Yup.string().min(2).required("Please enter your State"),
  district: Yup.string().min(6).required("Please enter your District"),
  landmark: Yup.string().min(6).required("Your Nearest Landscape"),
  pincode: Yup.string().min(6).required("Please enter your PIN Code"),

  //repassword: Yup.string()
    //.required("Confirm password is required")
//.oneOf([Yup.ref("password"), null], "Password must match"),
});