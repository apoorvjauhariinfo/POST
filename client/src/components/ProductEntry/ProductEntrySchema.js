import * as Yup from "yup";

export const ProductSchema = Yup.object({
  //producttype: Yup.string().required("Select Your Product Type"),
  // category: Yup.string().required("Please Select Product Category"),
  upccode: Yup.string().min(6).max(20).required("Please Enter UPC Manually"),
  name: Yup.string().min(2).required("Please enter Product Name"),
  // manufacturer: Yup.string().min(6).required("Please enter Manufacturer Name"),
  // emergencytype: Yup.string().required("Please Select Emergency Type"),
  description: Yup.string()
    .min(10)
    .required("Please enter Product Description"),
  manufacturer: Yup.string().min(3).required("Please enter Manufacturer Name"),
  productImage: Yup.mixed().required("Please add a product image"),

  //repassword: Yup.string()
  //.required("Confirm password is required")
  //.oneOf([Yup.ref("password"), null], "Password must match"),
});
