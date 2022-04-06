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
        maxlength: 12
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 18
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: true // true启用，false禁止
    },
    isLogin: {
        type: Number,
        default: 0 // 0未登录，1已登录
    },
    department: { type: String, }
});
//创建集合
const UserDB = mongoose.model('User', userSchema);
// UserDB.create([{
//     username: 'admin',
//     password: '123456',
//     email: '123456@qq.com',
//     phone: 12345678912,
//     role: "超级管理员",
//     state: true,
//     isLogin: 0
// }])

module.exports = {
    UserDB
}