const mongoose = require('mongoose');
const enterpriseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    corporation: {
        type: String,
        required: true
    },
    address: {
        type: Array,
        required: true
    },
    card: {
        type: Array,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    }
});
const EnterpriseDB = mongoose.model('Enterprise', enterpriseSchema);
// EnterpriseDB.create({
//     name: '筑优拌合站',
//     corporation: '张三',
//     number: '13888888888',
//     des: '道路建设',
//     address: ['安徽省合肥市庐阳区长江中路49号'],
//     card: ['6228482918445077111'],
// })
module.exports = {
    EnterpriseDB
}