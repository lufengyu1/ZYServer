const mongoose = require("mongoose");
const rejectSchema = mongoose.Schema({
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
        // required: true
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
const RejectDB = mongoose.model('Reject', rejectSchema);
module.exports = {
    RejectDB
}