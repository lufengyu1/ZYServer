const express = require('express');
const bill = express.Router();
const { BillDB } = require('../model/billdb');
const ObjectId = require('mongoose').Types.ObjectId;
// 获取账单列表
bill.get('/bill', async(req, res) => {
    const { pageNum, pageSize, query } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result = null;
    let total = 0;
    if (query.trim().length === 0) {
        result = await BillDB.find({});
        total = result.length;
        result = await BillDB.find({}).limit(pageSize - 0);
        if (pageNum > 0) {
            result = await BillDB.find({}).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
        }
        if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });

    } else {
        result = await BillDB.find({ _id: new ObjectId(query) });
        total = result.length;
        result = await BillDB.find({ _id: new ObjectId(query) }).limit(pageSize - 0);
        if (pageNum > 0) {
            result = await BillDB.find({ _id: new ObjectId(query) }).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
        }
        if (!result) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    }

    res.send({ result: { total, pageNum, billList: result }, meta: { status: 200, des: 'Success' } });
});

// 创建新账单
bill.put('/insert', async(req, res) => {
    let result = await BillDB.insertMany(req.body);
    if (!result) {
        return res.send({ result: null, meta: { status: 404, des: '创建账单失败' } });
    }
    return res.send({ result: result[0], meta: { status: 200, des: '成功创建账单' } })
});

// 更新账单
bill.put('/update', async(req, res) => {
    let result = await BillDB.updateOne({ _id: req.body.id }, { state: req.body.state });
    (result);
    if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "更新失败" } });
    return res.send({ result: null, meta: { status: 200, des: "更新成功" } })
});


module.exports = bill