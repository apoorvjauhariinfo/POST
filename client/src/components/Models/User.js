const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  landmark: { type: String, required: true },
  pincode: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  hospitalname: { type: String, required: true },
  registeras: { type: String, required: true },
  password:{type:String, required: true},
  verified: { type: Boolean, default: false },

});

const User = mongoose.model('User', UserModel);
module.exports = User;