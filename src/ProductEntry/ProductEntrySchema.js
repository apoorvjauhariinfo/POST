import * as Yup from "yup";

export const StockSchema = Yup.object({
  email: Yup.string().email().required("Email id is required"),
  hospitalname: Yup.string().min(6).max(20).required("Hospital Name is required"),
  registeras: Yup.string().min(6).max(20).required("Please Select Register Type"),
  address: Yup.string().min(6).required("Please enter Hospital address"),
  firstname: Yup.string().min(6).required("Please enter your First Name"),
  lastname: Yup.string().min(6).required("Please enter your Last NAme"),
  phone: Yup.string().min(10).required("Please enter Hospital phone number"),
  state: Yup.string().min(2).required("Please enter your State"),
  district: Yup.string().min(6).required("Please enter your District"),
  landmark: Yup.string().min(6).required("Your Nearest Landscape"),
  pincode: Yup.string().min(6).required("Please enter your PIN Code"),
  password: Yup.string().min(6).required("Please enter valid Password"),
  

  //repassword: Yup.string()
    //.required("Confirm password is required")
//.oneOf([Yup.ref("password"), null], "Password must match"),
});