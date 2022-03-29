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
    state: {
        type: Number,
        required: true
    }
});
const IsssuanceDB = mongoose.model('Isssuance', isssuanceSchema);
module.exports = {
    IsssuanceDB
}