import * as Yup from "yup";

export const StockSchema = Yup.object({
  name: Yup.string().min(1).required("Please Your Name"),

  phone: Yup.number().required("Phone No is invalid"),

  batchno: Yup.number().min(1).required("Please Enter Batch No"),
  unitcost: Yup.number().min(1).required("Enter Unit Cost"),
  totalquantity: Yup.number().min(1).required("Enter Total Quantity"),
 
 

  //repassword: Yup.string()
    //.required("Confirm password is required")
//.oneOf([Yup.ref("password"), null], "Password must match"),
});