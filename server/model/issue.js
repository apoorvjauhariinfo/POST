const mongoose = require('mongoose');

const iden = new mongoose.Schema({
  hospitalid:{type:String, required:true},

  productid: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  department: { type: String, required: true },
  subdepartment:{ type: String, required:true},
  quantityissued: { type: String, required: true },
 

});

const Issued = mongoose.model('Issued', iden);
module.exports = Issued;