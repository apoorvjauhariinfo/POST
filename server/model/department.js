const mongoose = require('mongoose');

const dep = new mongoose.Schema({
  hospitalid:{type:String, required:true},
  department: { type: String, required: true },
  
 

});

const Department = mongoose.model('Department', dep);
module.exports = Department;