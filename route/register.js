const express = require('express');
const register = express.Router();
const { RegisterDB } = require('../model/registerdb');
const ObjectId = require('mongoose').Types.ObjectId;
// 获取登记列表
register.get('/register', async(req, res) => {
    const { pageNum, pageSize, pageNum1, pageSize1, type, num, query, query1 } = req.query;
    let sort = {};
    sort[type] = num - 0;
    if (!pageNum || !pageSize || !pageNum1 || !pageSize1) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result = null;
    let result1 = null;
    let total = 0;
    let total1 = 0;
    if (query.trim().length === 0) {
        result = await RegisterDB.find({}).sort(sort);
        total = result.length;
        result = await RegisterDB.find({}).sort(sort).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    if (query1.trim().length === 0) {
        result1 = await RegisterDB.find({ status: 0 }).sort(sort);
        total1 = result1.length;
        result1 = await RegisterDB.find({ status: 0 }).sort(sort).skip((pageNum1 - 1) * pageSize1).limit(pageSize1 - 0);
    }
    if (query.trim().length === 24) {
        result = await RegisterDB.find({ _id: new ObjectId(query) }).sort(sort).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
        total = result.length;
    }
    if (query1.trim().length === 24) {
        result1 = await RegisterDB.find({ status: 0, _id: new ObjectId(query1) }).limit(pageSize1 - 0);
        total1 = result1.length;
    }
    if (!result || !result1) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });

    res.send({ result: { total: total, pageNum: pageNum, registerList: result, total1: total1, pageNum1: pageNum1, registerList1: result1 }, meta: { status: 200, des: 'Success' } });
});
// 获取未处理列表
register.get('/todo', async(req, res) => {
    let result = await RegisterDB.find({ status: 0 });
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: result, meta: { status: 200, des: "success" } });
});
// 插入
register.put('/insert', async(req, res) => {
    let result = null
    if (req.body.operation === 0) {
        console.log(req.body);
        result = await RegisterDB.insertMany({ _id: new ObjectId(req.body.id), ...req.body })
    } else {
        result = await RegisterDB.insertMany(req.body);

    }
    if (!result) return res.send({ result: null, meta: { status: 404, des: '入库信息创建失败' } });
    return res.send({ result: null, meta: { status: 200, des: '入库信息创建成功' } });
});
// 更新
register.put('/update', async(req, res) => {
    let result = await RegisterDB.updateOne({ _id: req.body._id }, req.body);
    if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "材料出入库失败" } });
    return res.send({ result: null, meta: { status: 200, des: "材料出入库成功" } })
});
register.get('/done', async(req, res) => {
    let result = await RegisterDB.find({ status: 1 });
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: result, meta: { status: 200, des: "success" } });
});
module.exports = register