import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const registrationSchema = Yup.object({

  email: Yup.string().email().required("Email id is required"),
  hospitalname: Yup.string().min(2).required("Hospital Name is required"),
  billingname: Yup.string().min(3).required("Billing Name is required"),
  address: Yup.string().min(3).required("Please enter Hospital address"),
  beds: Yup.number().min(1).max(999).required("No of beds availaible"),

  ceanumber: Yup.string().min(3).required("Please enter your CEA Number"),
  phone: Yup.string()
  .required("required")
  .matches(phoneRegExp, 'Phone number is not valid')
  .min(10, "Enter Valid Phone Number")
  .max(10, "Enter Valid Phone Number"),
  state: Yup.string().min(2).required("Please enter your State"),
  district: Yup.string().min(3).required("Please enter your District"),
  landmark: Yup.string().min(3).required("Your Nearest Landscape"),
  pincode: Yup.string()
  .required()
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(6, 'Must be exactly 6 digits')
  .max(6, 'Must be exactly 6 digits'),
  //repassword: Yup.string()
    //.required("Confirm password is required")
//.oneOf([Yup.ref("password"), null], "Password must match"),
});