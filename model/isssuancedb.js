const mongoose = require('mongoose');
const isssuanceSchema = mongoose.Schema({
    supplier: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        required: true
    },
    userable: { //可用
        type: Number,
        default: 0,
    },
    todo: { // 正在处理
        type: Number,
        default: 0,
    }
});
const IsssuanceDB = mongoose.model('Isssuance', isssuanceSchema);
module.exports = {
    IsssuanceDB
}