const mongoose = require('mongoose');

const iden = new mongoose.Schema({
  productid: { type: String, required: true },
  batchno: { type: String, required: true },
  unitcost: { type: String, required: true },
  totalquantity: { type: String, required: true },
  doe: { type: String, required: true },
  dom: { type: String, required: true },
 

});

const Stock = mongoose.model('Stock', iden);
module.exports = Stock;