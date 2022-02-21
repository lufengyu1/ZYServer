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
    }
});
const QuestionDB = mongoose.model('Question', questionSchema);
module.exports = { QuestionDB }