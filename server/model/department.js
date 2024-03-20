const mongoose = require('mongoose');

const dep = new mongoose.Schema({
  department: { type: String, required: true },
  
 

});

const Department = mongoose.model('Department', dep);
module.exports = Department;