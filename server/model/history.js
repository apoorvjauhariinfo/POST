const mongoose = require("mongoose");

const history = new mongoose.Schema({
  hospitalid: { type: String, required: true },
  date: { type: String, required: true },
  productid: { type: String, required: true },
  quantity: { type: String, required: true },
  type: { type: String, required: true },
  remark: { type: String, required: true },
  batch: { type: String },
});

const History = mongoose.model("History", history);
module.exports = History;

