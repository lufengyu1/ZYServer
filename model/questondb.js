const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    operation: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    operator: {
        type: String,
    },
    time: { type: String },
    action: { //问题原料处理方式
        type: String,
        required: true
    }
});
const QuestionDB = mongoose.model('Question', questionSchema);
module.exports = { QuestionDB }