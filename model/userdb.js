// 创建用户集合
const mongoose = require('mongoose');
const department = require('../route/department');
// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 18
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 18
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
        default: true // true启用，false禁止
    },
    isLogin: {
        type: Number,
        default: 0 // 0未登录，1已登录
    },
    department: { type: String, required: true, },
    create: {
        type: String,
        required: true,
    },
    card: {
        type: String,
        required: true,
    },
    idcard: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    }
});
//创建集合
const UserDB = mongoose.model('User', userSchema);
// UserDB.create([{
//     username: 'admin',
//     name: '陆凤宇',
//     password: '123456',
//     email: '123456@qq.com',
//     phone: 12345678912,
//     role: "超级管理员",
//     state: true,
//     isLogin: 0,
//     department: '开发部',
//     create: '2018-01-01 10:04:34'
// }]);

module.exports = {
    UserDB
}