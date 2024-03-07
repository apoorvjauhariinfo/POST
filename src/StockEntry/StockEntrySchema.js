import * as Yup from "yup";

export const StockSchema = Yup.object({
  batchno: Yup.string().min(1).required("Please Enter Batch No"),
  unitcost: Yup.string().min(1).max(20).required("Enter Unit Cost"),
  totalquantity: Yup.string().min(1).max(20).required("Enter Total Quantity"),
 
 

  //repassword: Yup.string()
    //.required("Confirm password is required")
//.oneOf([Yup.ref("password"), null], "Password must match"),
});