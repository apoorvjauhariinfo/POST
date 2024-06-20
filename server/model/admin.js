const mongoose = require('mongoose');

const Userfake = new mongoose.Schema({
  
 
  role: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
 

});

const Admin = mongoose.model('Admin', Userfake);
module.exports = Admin;