const mongoose = require('mongoose');

const iden = new mongoose.Schema({
    userid: { type: 'string', required: true },
    inventorymanagerid: { type: 'string', required: true },
    hospitalid: { type: String, required: true },

    productid: { type: String, required: true },
    demand: { type: String, required: true },
    status: { type: String, required: true },




});

const Request = mongoose.model('Request', iden);
module.exports = Request;