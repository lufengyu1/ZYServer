const express = require('express');
const register = express.Router();
const { RegisterDB } = require('../model/registerdb');
register.get('/register', async(req, res) => {
    const { pageNum, pageSize, pageNum1, pageSize1 } = req.query;
    if (!pageNum || !pageSize || !pageNum1 || !pageSize1) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result = await RegisterDB.find({});
    let result1 = await RegisterDB.find({ status: 0 });
    const total = result.length;
    const total1 = result1.length;
    result1 = await RegisterDB.find({ status: 0 }).limit(pageSize1 - 0);
    if (!result || !result1) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    if (pageNum > 0 || pageNum1 > 0) {
        result = await RegisterDB.find({}).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
        result1 = await RegisterDB.find({ status: 0 }).skip((pageNum1 - 1) * pageSize1).limit(pageSize1 - 0);
    }
    res.send({ result: { total, pageNum, registerList: result, total1, pageNum1, registerList1: result1 }, meta: { status: 200, des: 'Success' } });
});
register.put('/insert', async(req, res) => {
    let result = await RegisterDB.insertMany(req.body);
    if (!result) return res.send({ result: null, meta: { status: 404, des: '入库信息创建失败' } });
    return res.send({ result: null, meta: { status: 200, des: '入库信息创建成功' } });
});
module.exports = register