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
    },
    phone: {
        type: String,
    },
    address: { type: String, },
    children: {
        type: Array,
    },
    card: {
        type: String,
        required: true
    }
});

const SupplierDB = mongoose.model('Supplier', SupplierScher);
// SupplierDB.create({
//     name: '供应商B',
//     des: '出售拌合站原料',
//     CD: '2022-1-11',
//     children: [{
//         name: '生石灰',
//         supplier: '供应商B',
//         PD: '2022-1-1',
//         EXP: '2025-1-1',
//         price: 1.1,
//         quantity: 10000
//     }, {
//         name: '熟石灰',
//         supplier: '供应商B',
//         PD: '2022-1-1',
//         EXP: '2025-1-1',
//         price: 1.1,
//         quantity: 10000
//     }]
// });

module.exports = {
    SupplierDB
}