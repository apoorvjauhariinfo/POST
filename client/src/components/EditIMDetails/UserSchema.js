import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const registrationSchema = Yup.object({
  email: Yup.string().email().required("Email id is required"),
  name: Yup.string().min(3).required("Please enter your First Name"),
  phone: Yup.string()
  .required("required")
  .matches(phoneRegExp, 'Phone number is not valid')
  .min(10, "Enter Valid Phone Number")
  .max(10, "Enter Valid Phone Number"),
  password: Yup.string().min(6).required("Please enter valid Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),

});