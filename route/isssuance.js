const express = require('express');
const isssuance = express.Router();
const { IsssuanceDB } = require('../model/isssuancedb');
const { BillDB } = require('../model/billdb');
isssuance.get('/isssuance', async(req, res) => {
    let { query, pageNum, pageSize } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    // 分页 模糊查询 pageSize要转换为数字
    let result = await IsssuanceDB.find({ name: { $regex: query } });

    let total = result.length;
    result = await IsssuanceDB.find({ name: { $regex: query } }).limit(pageSize - 0);
    if (pageNum > 0) {
        result = await IsssuanceDB.find({ name: { $regex: query } }).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: { total, pageNum, isssuance: result }, meta: { status: 200, des: 'success' } })
});
isssuance.put('/insert', async(req, res) => {
    console.log(req.body);
    let info = await BillDB.findOne({ _id: req.body.id });
    let i = { supplier: info.supplier, name: info.name, time: req.body.time, quantity: info.quantity, state: 0 };
    let result = await IsssuanceDB.insertMany(i);
    if (!result) {
        return res.send({ result: null, meta: { status: 404, des: '出库信息创建失败' } });
    }
    return res.send({ result: null, meta: { status: 200, des: 'success' } });
});
isssuance.put('/update', async(req, res) => {
    let result = await IsssuanceDB.findOne({ _id: req.body.id });
    let r = null;
    if (!result) return res.send({ result: null, meta: { status: 404, des: '出库信息无数据' } });
    if (result.quantity * 1 - req.body.quantity * 1 === 0) {
        r = await IsssuanceDB.deleteOne({ _id: req.body.id, });
    } else {
        r = await IsssuanceDB.updateOne({ _id: req.body.id }, { quantity: result.quantity * 1 - req.body.quantity * 1 });
    }
    res.send({ result: null, meta: { status: 200, des: 'success' } });
})
module.exports = isssuance;