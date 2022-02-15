const mongoose = require('mongoose');
const stockSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    supplier: {
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
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    limit: {
        type: Number,
        required: true
    }
});
const StockDB = mongoose.model('Stock', stockSchema);
// StockDB.create({
//     name: '生石灰',
//     number: 100,
//     limit: 100
// });
module.exports = {
    StockDB
}