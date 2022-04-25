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
// RightDB.create([{ id: 120, name: '角色列表', level: 1, pid: 100 }, { id: 121, name: '添加角色', level: 2, pid: 120 }, { id: 122, name: '删除角色', level: 2, pid: 120 }, { id: 123, name: '修改角色', level: 2, pid: 120 }, { id: 124, name: '查找角色', level: 2, pid: 120 }])
// RightDB.create([{ id: 130, name: '部门列表', level: 1, pid: 100 }, { id: 131, name: '添加部门', level: 2, pid: 130 }, { id: 132, name: '删除部门', level: 2, pid: 130 }, { id: 133, name: '修改部门', level: 2, pid: 130 }, { id: 134, name: '查找部门', level: 2, pid: 130 }])
// RightDB.create([{ id: 140, name: '权限列表', level: 1, pid: 100 }, { id: 141, name: '添加权限', level: 2, pid: 140 }, { id: 142, name: '删除权限', level: 2, pid: 140 }, { id: 143, name: '修改权限', level: 2, pid: 140 }, { id: 144, name: '查找权限', level: 2, pid: 140 }])
// RightDB.create([{ id: 210, name: '原料信息', level: 1, pid: 200 }, { id: 211, name: '添加原料信息', level: 2, pid: 210 }, { id: 212, name: '删除原料信息', level: 2, pid: 210 }, { id: 213, name: '修改原料信息', level: 2, pid: 210 }, { id: 214, name: '查找原料信息', level: 2, pid: 210 }])
// RightDB.create([{ id: 220, name: '供应商信息', level: 1, pid: 200 }, { id: 221, name: '添加供应商信息', level: 2, pid: 220 }, { id: 222, name: '删除供应商信息', level: 2, pid: 220 }, { id: 223, name: '修改供应商信息', level: 2, pid: 220 }, { id: 224, name: '查找供应商信息', level: 2, pid: 220 }])
// RightDB.create([{ id: 230, name: '账单信息', level: 1, pid: 200 }, { id: 231, name: '添加账单信息', level: 2, pid: 230 }, { id: 232, name: '删除账单信息', level: 2, pid: 230 }, { id: 233, name: '修改账单信息', level: 2, pid: 230 }, { id: 234, name: '查找账单信息', level: 2, pid: 230 }])
// RightDB.create([{ id: 240, name: '退货信息', level: 1, pid: 200 }, { id: 241, name: '添加退货信息', level: 2, pid: 240 }, { id: 242, name: '删除退货信息', level: 2, pid: 240 }, { id: 243, name: '修改退货信息', level: 2, pid: 240 }, { id: 244, name: '查找退货信息', level: 2, pid: 240 }])
// RightDB.create([{ id: 310, name: '登记出入库信息', level: 1, pid: 300 }, { id: 311, name: '添加登记出入库信息', level: 2, pid: 310 }, { id: 312, name: '删除登记出入库信息', level: 2, pid: 310 }, { id: 313, name: '修改登记出入库信息', level: 2, pid: 310 }, { id: 314, name: '查找登记出入库信息', level: 2, pid: 310 }])
// RightDB.create([{ id: 320, name: '原料库存检查', level: 1, pid: 300 }, { id: 321, name: '添加原料库存检查', level: 2, pid: 320 }, { id: 322, name: '删除原料库存检查', level: 2, pid: 320 }, { id: 323, name: '修改原料库存检查', level: 2, pid: 320 }, { id: 324, name: '查找原料库存检查', level: 2, pid: 320 }])
// RightDB.create([{ id: 330, name: '原料出库', level: 1, pid: 300 }, { id: 331, name: '添加原料出库', level: 2, pid: 330 }, { id: 332, name: '删除原料出库', level: 2, pid: 330 }, { id: 333, name: '修改原料出库', level: 2, pid: 330 }, { id: 334, name: '查找原料出库', level: 2, pid: 330 }])
// RightDB.create([{ id: 340, name: '问题原料记录', level: 1, pid: 300 }, { id: 341, name: '添加问题原料记录', level: 2, pid: 340 }, { id: 342, name: '删除问题原料记录', level: 2, pid: 340 }, { id: 343, name: '修改问题原料记录', level: 2, pid: 340 }, { id: 344, name: '查找问题原料记录', level: 2, pid: 340 }])
// RightDB.create([{ id: 410, name: '原料入库数据统计', level: 1, pid: 400 }, { id: 411, name: '添加原料入库数据统计', level: 2, pid: 410 }, { id: 412, name: '删除原料入库数据统计', level: 2, pid: 410 }, { id: 413, name: '修改原料入库数据统计', level: 2, pid: 410 }, { id: 414, name: '查找原料入库数据统计', level: 2, pid: 410 }])
// RightDB.create([{ id: 420, name: '原料出库数据统计', level: 1, pid: 400 }, { id: 421, name: '添加原料出库数据统计', level: 2, pid: 420 }, { id: 422, name: '删除原料出库数据统计', level: 2, pid: 420 }, { id: 423, name: '修改原料出库数据统计', level: 2, pid: 420 }, { id: 424, name: '查找原料出库数据统计', level: 2, pid: 420 }])
module.exports = {
    RightDB
};