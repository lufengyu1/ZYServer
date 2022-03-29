const mongoose = require('mongoose');
const materialInfoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    supplier: {
        type: String,
        required: true
    },


    price: {
        type: Number,
        required: true
    },

});
const MaterialInfoDB = mongoose.model('materialInfo', materialInfoSchema);
// MaterialInfoDB.create({
//     name: '粉煤灰',
//     supplier: '供应商A',
//     PD: '2021-1-1',
//     EXP: '2023-1-1',
//     price: 100,
//     quantity: 100
// })
module.exports = {
    MaterialInfoDB
}