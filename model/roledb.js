// 创建用户集合
const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    des: {
        type: String
    },
    right: {
        type: Array,
        default: []
    },
    children: {
        type: Array,
        default: []
    }

});
const RoleDB = mongoose.model('Role', roleSchema);
// RoleDB.create([{
//     name: '超级管理员',
//     des: '拥有所有权限'
// }, {
//     name: '普通管理员',
//     des: '拥有大部分权限，无法对超级管理员操作',
// }, {
//     name: '普通成员',
//     des: '只有基本管理功能',
// }]);
module.exports = {
    RoleDB
}