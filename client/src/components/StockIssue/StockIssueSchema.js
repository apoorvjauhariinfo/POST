import * as Yup from "yup";

export const StockIssueSchema = Yup.object({
  firstname: Yup.string().min(4).required("Please enter your First Name"),
  lastname: Yup.string().min(4).required("Please enter your Last NAme"),
  quantityissued: Yup.string().required("Please enter Valid Quantity"),
  
  //repassword: Yup.string()
    //.required("Confirm password is required")
//.oneOf([Yup.ref("password"), null], "Password must match"),
});