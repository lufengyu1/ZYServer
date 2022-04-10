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
//     name: '用户管理',
//     path: 'users',
//     children: [{
//         id: '110',
//         name: '用户列表',
//         path: 'users'
//     }, {
//         id: '120',
//         name: '权限列表',
//         path: 'right'
//     }, {
//         id: '130',
//         name: '部门列表',
//         path: 'department'
//     }]
// }, {
//     id: '200',
//     name: '原料管理',
//     path: 'material',
//     children: [{
//         id: '210',
//         name: '原料信息',
//         path: 'materialinfo',
//         children: []
//     }, {
//         id: '220',
//         name: '供应商信息',
//         path: 'supplier',
//         children: []
//     }, {
//         id: '230',
//         name: '账单信息',
//         path: 'bill',
//         children: []
//     }, {
//         id: '240',
//         name: '退货信息',
//         path: 'reject',
//         children: []
//     }]
// }, {
//     id: '300',
//     name: '原料库存管理',
//     path: '1',
//     children: [{
//         id: '310',
//         name: '登记出入库信息',
//         path: 'register',
//         children: []
//     }, {
//         id: '320',
//         name: '原料库存检查',
//         path: 'stock',
//         children: []
//     }, {
//         id: '330',
//         name: '原料出库',
//         path: 'isssuance',
//         children: []
//     }, {
//         id: '340',
//         name: '问题原料记录',
//         path: 'question',
//         children: []
//     }, { id: '400', name: '数据统计', path: 'statistics', children: [{ id: '410', name: '原料入库数据统计', path: 'inbound' }, { id: '420', name: '原料出库数据统计', path: 'outbound' }, { id: '430', name: '原料出入库数据统计', path: 'iobound' }] }]
// }]);
// MenuDB.create({ id: '400', name: '数据统计', path: 'statistics', children: [{ id: '410', name: '原料入库数据统计', path: 'inbound' }, { id: '420', name: '原料出库数据统计', path: 'outbound' }] })
module.exports = {
    MenuDB
}