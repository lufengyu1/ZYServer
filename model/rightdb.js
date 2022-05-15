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
// RightDB.create([{ id: 100, name: '基础管理', level: 0 }, { id: 200, name: '入库管理', level: 0 }, { id: 300, name: '出库管理', level: 0 }, { id: 400, name: '账单管理', level: 0 }, { id: 500, name: '数据统计', level: 0 }, { id: 600, name: '用户管理', level: 0 }])
// RightDB.create([{ id: 110, name: '登记出入库信息', level: 1, pid: 100 }, { id: 111, name: '添加登记出入库信息', level: 2, pid: 110 }, { id: 112, name: '删除登记出入库信息', level: 2, pid: 110 }, { id: 113, name: '修改登记出入库信息', level: 2, pid: 110 }, { id: 114, name: '查找登记出入库信息', level: 2, pid: 110 }])
// RightDB.create([{ id: 120, name: '原料库存检查', level: 1, pid: 100 }, { id: 121, name: '添加原料库存检查', level: 2, pid: 120 }, { id: 122, name: '删除原料库存检查', level: 2, pid: 120 }, { id: 123, name: '修改原料库存检查', level: 2, pid: 120 }, { id: 124, name: '查找原料库存检查', level: 2, pid: 120 }])
// RightDB.create([{ id: 130, name: '供应商信息', level: 1, pid: 100 }, { id: 131, name: '添加供应商信息', level: 2, pid: 130 }, { id: 132, name: '删除供应商信息', level: 2, pid: 130 }, { id: 133, name: '修改供应商信息', level: 2, pid: 130 }, { id: 134, name: '查找供应商信息', level: 2, pid: 130 }])
// RightDB.create([{ id: 140, name: '企业信息', level: 1, pid: 100 }, { id: 141, name: '添加企业信息', level: 2, pid: 140 }, { id: 142, name: '删除企业信息', level: 2, pid: 140 }, { id: 143, name: '修改企业信息', level: 2, pid: 140 }, { id: 144, name: '查找企业信息', level: 2, pid: 140 }])

// RightDB.create([{ id: 210, name: '原料入库', level: 1, pid: 200 }, { id: 211, name: '添加原料入库', level: 2, pid: 210 }, { id: 212, name: '删除原料入库', level: 2, pid: 210 }, { id: 213, name: '修改原料入库', level: 2, pid: 210 }, { id: 214, name: '查找原料入库', level: 2, pid: 210 }])
// RightDB.create([{ id: 220, name: '入库信息', level: 1, pid: 200 }, { id: 221, name: '添加入库信息', level: 2, pid: 220 }, { id: 222, name: '删除入库信息', level: 2, pid: 220 }, { id: 223, name: '修改入库信息', level: 2, pid: 220 }, { id: 224, name: '查找入库信息', level: 2, pid: 220 }])
// RightDB.create([{ id: 230, name: '入库退货查询', level: 1, pid: 200 }, { id: 231, name: '添加入库退货查询', level: 2, pid: 230 }, { id: 232, name: '删除入库退货查询', level: 2, pid: 230 }, { id: 233, name: '修改入库退货查询', level: 2, pid: 230 }, { id: 234, name: '查找入库退货查询', level: 2, pid: 230 }])

// RightDB.create([{ id: 310, name: '原料出库', level: 1, pid: 300 }, { id: 311, name: '添加原料出库', level: 2, pid: 310 }, { id: 312, name: '删除原料出库', level: 2, pid: 310 }, { id: 313, name: '修改原料出库', level: 2, pid: 310 }, { id: 314, name: '查找原料出库', level: 2, pid: 310 }])
// RightDB.create([{ id: 320, name: '出库信息', level: 1, pid: 300 }, { id: 321, name: '添加出库信息', level: 2, pid: 320 }, { id: 322, name: '删除出库信息', level: 2, pid: 320 }, { id: 323, name: '修改出库信息', level: 2, pid: 320 }, { id: 324, name: '查找出库信息', level: 2, pid: 320 }])
// RightDB.create([{ id: 330, name: '出库退货查询', level: 1, pid: 300 }, { id: 331, name: '添加出库退货查询', level: 2, pid: 330 }, { id: 332, name: '删除出库退货查询', level: 2, pid: 330 }, { id: 333, name: '修改出库退货查询', level: 2, pid: 330 }, { id: 334, name: '查找出库退货查询', level: 2, pid: 330 }])

// RightDB.create([{ id: 410, name: '账单信息', level: 1, pid: 400 }, { id: 411, name: '添加账单信息', level: 2, pid: 410 }, { id: 412, name: '删除账单信息', level: 2, pid: 410 }, { id: 413, name: '修改账单信息', level: 2, pid: 410 }, { id: 414, name: '查找账单信息', level: 2, pid: 410 }])

// RightDB.create([{ id: 510, name: '原料入库数据统计', level: 1, pid: 500 }, { id: 511, name: '添加原料入库数据统计', level: 2, pid: 510 }, { id: 512, name: '删除原料入库数据统计', level: 2, pid: 510 }, { id: 513, name: '修改原料入库数据统计', level: 2, pid: 510 }, { id: 514, name: '查找原料入库数据统计', level: 2, pid: 510 }])
// RightDB.create([{ id: 520, name: '原料出库数据统计', level: 1, pid: 500 }, { id: 521, name: '添加原料出库数据统计', level: 2, pid: 520 }, { id: 522, name: '删除原料出库数据统计', level: 2, pid: 520 }, { id: 523, name: '修改原料出库数据统计', level: 2, pid: 520 }, { id: 524, name: '查找原料出库数据统计', level: 2, pid: 520 }])

// RightDB.create([{ id: 610, name: '用户列表', level: 1, pid: 600 }, { id: 611, name: '添加用户', level: 2, pid: 610 }, { id: 612, name: '删除用户', level: 2, pid: 610 }, { id: 613, name: '修改用户', level: 2, pid: 610 }, { id: 614, name: '查找用户', level: 2, pid: 610 }])
// RightDB.create([{ id: 620, name: '角色列表', level: 1, pid: 600 }, { id: 621, name: '添加角色', level: 2, pid: 620 }, { id: 622, name: '删除角色', level: 2, pid: 620 }, { id: 623, name: '修改角色', level: 2, pid: 620 }, { id: 624, name: '查找角色', level: 2, pid: 620 }])
// RightDB.create([{ id: 630, name: '分组列表', level: 1, pid: 600 }, { id: 631, name: '添加分组', level: 2, pid: 630 }, { id: 632, name: '删除分组', level: 2, pid: 630 }, { id: 633, name: '修改分组', level: 2, pid: 630 }, { id: 634, name: '查找分组', level: 2, pid: 630 }])
// RightDB.create([{ id: 640, name: '权限列表', level: 1, pid: 600 }, { id: 641, name: '添加权限', level: 2, pid: 640 }, { id: 642, name: '删除权限', level: 2, pid: 640 }, { id: 643, name: '修改权限', level: 2, pid: 640 }, { id: 644, name: '查找权限', level: 2, pid: 640 }])
module.exports = {
    RightDB
};