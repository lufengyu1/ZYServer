const mongoose = require('mongoose');
const billSchema = mongoose.Schema({
    supplier: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    state: {
        type: Number,
        required: true,
        default: 0, //0等待  1完成 2异常
    }
});
const BillDB = mongoose.model('Bill', billSchema);
// BillDB.create({
//     supplier: '供应商A',
//     name: '生石灰',
//     number: 1000,
//     price: 100,
//     total: 100000,
//     state: 0
// });
module.exports = {
    BillDB
}