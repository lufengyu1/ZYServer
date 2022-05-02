const mongoose = require('mongoose');
const registerSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    operation: {
        type: Number, // 0 出库 ； 1 入库
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    operator: {
        type: String,
    },
    time: {
        type: String,
    },
    status: { // 0 未操作 1 成功 2 失败
        type: Number,
        required: true
    }
})
const RegisterDB = mongoose.model('Register', registerSchema);

module.exports = {
    RegisterDB
}