import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const StockSchema = Yup.object({
  name: Yup.string().min(1).required("Please Your Name"),

  phone: Yup.string()
  .required("required")
  .matches(phoneRegExp, 'Phone number is not valid')
  .min(10, "Enter Valid Phone Number")
  .max(10, "Enter Valid Phone Number"),

  batchno: Yup.number().min(1).required("Please Enter Batch No"),
  unitcost: Yup.number().min(1).required("Enter Unit Cost"),
  totalquantity: Yup.number().min(1).required("Enter Total Quantity"),
  doe: Yup.date()
    .min(Yup.ref("dom"), "Date of Expiry cannot be before Date of Manufacturing")
    .required("Date of Expiry is required"),
 
 

  //repassword: Yup.string()
    //.required("Confirm password is required")
//.oneOf([Yup.ref("password"), null], "Password must match"),
});