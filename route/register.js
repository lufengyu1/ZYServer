const express = require('express');
const register = express.Router();
const { RegisterDB } = require('../model/registerdb');
const ObjectId = require('mongoose').Types.ObjectId;
// 获取登记列表
register.get('/all', async(req, res) => {
    const { pageNum, pageSize, type, num, query } = req.query;
    let sort = {};
    sort[type] = num - 0;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result = null;
    let total = 0;
    if (query.trim().length === 0) {
        result = await RegisterDB.find({}).sort(sort);
        total = result.length;
        result = await RegisterDB.find({}).sort(sort).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    if (query.trim().length === 24) {
        result = await RegisterDB.find({ _id: new ObjectId(query) }).sort(sort).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
        total = result.length;
    }
    if (!result) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });

    res.send({ result: { total: total, pageNum: pageNum, registerList: result }, meta: { status: 200, des: 'Success' } });
});
// 获取未处理列表 分页
register.get('/todos', async(req, res) => {
    const { pageNum1, pageSize1, type, num, query1 } = req.query;
    let sort = {};
    sort[type] = num - 0;
    if (!pageNum1 || !pageSize1) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result1 = null;
    let total1 = 0;
    if (query1.trim().length === 0) {
        result1 = await RegisterDB.find({ status: 0 }).sort(sort);
        total1 = result1.length;
        result1 = await RegisterDB.find({ status: 0 }).sort(sort).skip((pageNum1 - 1) * pageSize1).limit(pageSize1 - 0);
    }
    if (query1.trim().length === 24) {
        result1 = await RegisterDB.find({ status: 0, _id: new ObjectId(query1) }).limit(pageSize1 - 0);
        total1 = result1.length;
    }
    if (!result1) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    res.send({ result: { total1: total1, pageNum1: pageNum1, registerList1: result1 }, meta: { status: 200, des: 'Success' } });
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
// 获取已完成的
register.get('/done', async(req, res) => {
    let result = await RegisterDB.find({ status: 1 });
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: result, meta: { status: 200, des: "success" } });
});
// 获取已完成的入库 或 出库 加分页
register.get('/inout', async(req, res) => {
    let { pageNum, pageSize, query, type } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let total = 0;
    let result = null;
    if (query.trim().length === 0) {
        result = await RegisterDB.find({ status: 1, operation: type, });
        total = result.length;
        result = await RegisterDB.find({
            status: 1,
            operation: type,
        }).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    if (query.trim().length === 24) {
        result = await RegisterDB.find({
            status: 1,
            operation: type,
            _id: new ObjectId(query)
        }).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
        total = result.length;
    }
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: { total, pageNum, list: result }, meta: { status: 200, des: "success" } });
});
module.exports = register