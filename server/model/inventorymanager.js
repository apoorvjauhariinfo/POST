const mongoose = require('mongoose');

const Userfake = new mongoose.Schema({
  hospitalid: { type: String, required: true },
  userid: { type: String, required: true },
  role: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
 

});

const InventoryManager = mongoose.model('InventoryManager', Userfake);
module.exports = InventoryManager;