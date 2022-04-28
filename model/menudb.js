// 创建用户集合
const mongoose = require('mongoose');
// 创建用户集合规则
const menuSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
    },
    children: {
        type: Array,
    }
});
//创建集合
const MenuDB = mongoose.model('Menu', menuSchema);
// MenuDB.create([{
//     id: '100',
//     name: '基础管理',
//     path: 'basic',
//     children: [{
//         id: '110',
//         name: '登记出入库信息',
//         path: 'register',
//         children: []
//     }, {
//         id: '120',
//         name: '原料库存检查',
//         path: 'stock',
//         children: []
//     }, {
//         id: '130',
//         name: '供应商信息',
//         path: 'supplier',
//         children: []
//     }]
// }, {
//     id: '200',
//     name: '入库管理',
//     path: '1',
//     children: [{
//         id: '210',
//         name: '原料入库',
//         path: 'materialinfo',
//         children: []
//     }, {
//         id: '220',
//         name: '入库信息',
//         path: 'instock',
//         children: []
//     }, {
//         id: '230',
//         name: '入库退货查询',
//         path: 'reject',
//         children: []
//     }]
// }, {
//     id: '300',
//     name: '出库管理',
//     path: '1',
//     children: [{
//         id: '310',
//         name: '原料出库',
//         path: 'isssuance'
//     }, {
//         id: '320',
//         name: '出库信息',
//         path: 'outstock'
//     }, {
//         id: '330',
//         name: '出库退货查询',
//         path: 'question'
//     }]
// }, {
//     id: '400',
//     name: '账单管理',
//     path: 'bills',
//     children: [{ id: '410', name: '账单信息', path: 'bill' }]
// }, {
//     id: '500',
//     name: '数据统计',
//     path: 'statistics',
//     children: [{
//         id: '510',
//         name: '原料入库数据统计',
//         path: 'inbound'
//     }, {
//         id: '520',
//         name: '原料出库数据统计',
//         path: 'outbound'
//     }]
// }, {
//     id: '600',
//     name: '人力资源管理',
//     path: 'users',
//     children: [{
//         id: '600',
//         name: '用户列表',
//         path: 'users'
//     }, {
//         id: '620',
//         name: '角色列表',
//         path: 'role'
//     }, {
//         id: '630',
//         name: '部门列表',
//         path: 'department'
//     }, {
//         id: '640',
//         name: '权限列表',
//         path: 'right'
//     }]
// }]);
module.exports = {
    MenuDB
}