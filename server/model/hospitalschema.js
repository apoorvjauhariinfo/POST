const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  userid:{type:String, required:true},

  hospitalname: { type: String, required: true },
  billingname: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  beds: { type: String, required: true },

  ceanumber: { type: String, required: true },
  phone: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  landmark: { type: String, required: true },
  pincode: { type: String, required: true },
  profileImage: { type: Buffer, required: true },

});

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;