// 创建用户集合
const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
});
const DepartmentDB = mongoose.model('Department', departmentSchema);
// DepartmentDB.create([{
//     name: '开发部',
// }, {
//     name: '测试部',
// }, {
//     name: '行政部',
// }, {
//     name: '营销部'
// }]);
module.exports = {
    DepartmentDB
}