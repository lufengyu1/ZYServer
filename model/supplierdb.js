const mongoose = require('mongoose');
const SupplierScher = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    des: {
        type: String,
        required: true
    },
    CD: {
        type: String,
        required: true
    },
    children: {
        type: Array,
        required: true
    }
});

const SupplierDB = mongoose.model('Supplier', SupplierScher);
// SupplierDB.create({
//     name: '供应商G',
//     des: '出售拌合站原料',
//     CD: '2022-1-11',
//     children: []
// });

module.exports = {
    SupplierDB
}