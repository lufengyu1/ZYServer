const mongoose = require('mongoose');
const registerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    operation: {
        type: Number,
        required: true
    },
    operator: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})
const RegisterDB = mongoose.model('Register', registerSchema);
// RegisterDB.create({
//     name: '生石灰',
//     operation: 0, // 0 出库 ； 1 入库
//     operator: 'aaa',
//     time: '2022-1-1 00:00:00'
// });
module.exports = {
    RegisterDB
}