const express = require('express');
const department = express.Router();
const { DepartmentDB } = require('../model/departmentdb');
// get
department.get('/', async(req, res) => {
    let result = await DepartmentDB.find({});
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: result, meta: { status: 200, des: 'success' } })
});
// // insert
// role.put('/insert', async(req, res) => {
//     let exist = await DepartmentDB.findOne({ name: req.body.name });
//     if (exist) {
//         return res.send({ result: null, meta: { status: 404, des: "角色已存在" } });
//     } else {
//         let result = await DepartmentDB.insertMany(req.body);
//         if (result) {
//             return res.send({ res: null, meta: { status: 200, des: "success" } });
//         } else {
//             return res.send({ result: null, meta: { status: 404, des: 'error' } });
//         }
//     }
// });
// // update
// role.put('/update', async(req, res) => {
//     let result = await DepartmentDB.updateOne({ name: req.body.name }, req.body)
//     if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "用户信息更新失败" } });
//     return res.send({ result: null, meta: { status: 200, des: "更新成功" } })
// });
// // delete 
// role.delete('/delete', async(req, res) => {
//     let result1 = await DepartmentDB.findOne({ _id: req.query._id })
//     if (!result1) return res.send({ result: null, meta: { status: 404, des: "角色未找到" } });
//     let result2 = await DepartmentDB.deleteOne({ _id: req.query._id });
//     if (result2.deletedCount > 0) return res.send({ result: null, meta: { status: 200, des: "success" } });
//     else return res.send({ result: null, meta: { status: 404, des: "角色删除失败" } });
// });
module.exports = department;