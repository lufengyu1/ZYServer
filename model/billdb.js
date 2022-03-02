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
    PD: {
        type: String,
        required: true
    },
    EXP: {
        type: String,
        required: true
    },
    quantity: {
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
        default: 0, //0等待  1完成  2异常
    },
    time: {
        type: String,
        required: true
    },
    operator: {
        type: String,
    }

});
const BillDB = mongoose.model('Bill', billSchema);
// BillDB.create({
//     name: '生石灰',
//     supplier: '供应商A',
//     PD: '2022-1-1',
//     EXP: "2025-1-1",
//     quantity: 1000,
//     price: 1,
//     total: 1000,
//     state: 0
// });
module.exports = {
    BillDB
}