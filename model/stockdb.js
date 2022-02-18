const mongoose = require('mongoose');
const stockSchema = mongoose.Schema({
    name: {
        type: String,
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
//     quantity: 100,
//     limit: 100
// });
module.exports = {
    StockDB
}