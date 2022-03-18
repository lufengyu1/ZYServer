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
    // PD: {
    //     type: String,
    //     required: true
    // },
    // EXP: {
    //     type: String,
    //     required: true
    // },
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