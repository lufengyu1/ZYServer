const mongoose = require('mongoose');
const rightSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    pid: {
        type: String,
        default: 0
    },
    children: {
        type: Array,
        default: []
    }
});
const RightDB = mongoose.model('Right', rightSchema);
// RightDB.create([{ id: 100, name: '用户管理', level: 0 }, { id: 200, name: '原料管理', level: 0 }, { id: 300, name: '原料库存管理', level: 0 }, { id: 400, name: '数据统计', level: 0 }])
// RightDB.create([{ id: 110, name: '用户列表', level: 1, pid: 100 }, { id: 111, name: '添加用户', level: 2, pid: 110 }, { id: 112, name: '删除用户', level: 2, pid: 110 }, { id: 113, name: '修改用户', level: 2, pid: 110 }, { id: 114, name: '查找用户', level: 2, pid: 110 }])
module.exports = {
    RightDB
};