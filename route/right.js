const { RightDB } = require('../model/rightdb');
const express = require('express');
const right = express.Router();
const buildTree = require('../fun/buildTree.js');
// 获取权限列表 分页
right.get('/', async(req, res) => {
    let { query, pageNum, pageSize } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    // 分页 模糊查询 pageSize要转换为数字
    let result = await RightDB.find({ name: { $regex: query } }).sort({ id: 1 });
    let total = result.length;
    result = await RightDB.find({ name: { $regex: query } }).skip((pageNum - 1) * pageSize).limit(pageSize - 0).sort({ id: 1 });
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: { total, pageNum, rights: result }, meta: { status: 200, des: 'success' } })
});
// 权限列表 树形
right.get('/tree', async(req, res) => {
    let result = await RightDB.find({});
    if (!result.length) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    let rights = buildTree(result);
    res.send({ result: rights, meta: { status: 200, des: 'success' } });
});
module.exports = right;