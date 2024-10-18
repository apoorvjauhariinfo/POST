const mongoose = require("mongoose");

const iden = new mongoose.Schema({
  hospitalid: { type: String, required: true },
  producttype: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  upccode: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  origin: { type: String, required: true },
  emergencytype: { type: String, required: true },

  description: { type: String, required: true },
  imid:{ type:String, required: true },
  productImage: { type: Buffer, required: true },
  date: { type: String, required: true },
});

const Product = mongoose.model("Product", iden);
module.exports = Product;
