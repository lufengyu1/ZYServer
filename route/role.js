const express = require('express');
const role = express.Router();
const { RoleDB } = require('../model/roledb');
// get 有分页
role.get('/', async(req, res) => {
    let { query, pageNum, pageSize } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    // 分页 模糊查询 pageSize要转换为数字
    let result = await RoleDB.find({ name: { $regex: query } });
    let total = result.length;
    result = await RoleDB.find({ name: { $regex: query } }).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: { total, pageNum, users: result }, meta: { status: 200, des: 'success' } })
});
// insert
role.put('/insert', async(req, res) => {
    let exist = await RoleDB.findOne({ name: req.body.name });
    if (exist) {
        return res.send({ result: null, meta: { status: 404, des: "角色已存在" } });
    } else {
        let result = await RoleDB.insertMany(req.body);
        if (result) {
            return res.send({ res: null, meta: { status: 200, des: "success" } });
        } else {
            return res.send({ result: null, meta: { status: 404, des: 'error' } });
        }
    }
});
// update
role.put('/update', async(req, res) => {
    let result = await RoleDB.updateOne({ name: req.body.name }, req.body)
    if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "用户信息更新失败" } });
    return res.send({ result: null, meta: { status: 200, des: "更新成功" } })
});
// delete 
role.delete('/delete', async(req, res) => {
    let result1 = await RoleDB.findOne({ _id: req.query._id })
    if (!result1) return res.send({ result: null, meta: { status: 404, des: "角色未找到" } });
    let result2 = await RoleDB.deleteOne({ _id: req.query._id });
    if (result2.deletedCount > 0) return res.send({ result: null, meta: { status: 200, des: "success" } });
    else return res.send({ result: null, meta: { status: 404, des: "角色删除失败" } });
});
// get 无分页
role.get('/role', async(req, res) => {
    let result = await RoleDB.find({});
    if (!result) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: result, meta: { status: 200, des: 'success' } });
});
// 根据角色名查询
role.get('/rolename', async(req, res) => {
    let result = await RoleDB.findOne({ name: req.query.name });
    if (!result) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: result, meta: { status: 200, des: 'success' } });
});
module.exports = role;