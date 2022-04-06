const express = require("express");
const reject = express.Router();
const { RejectDB } = require("../model/rejectdb");

reject.get('/reject', async(req, res) => {
    let { pageNum, pageSize, query } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    // 分页 模糊查询 pageSize要转换为数字
    let result = await RejectDB.find({ id: { $regex: query } });
    let total = result.length;
    result = await RejectDB.find({ id: { $regex: query } }).limit(pageSize - 0);
    if (pageNum > 0) {
        result = await RejectDB.find({ id: { $regex: query } }).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: { total, pageNum, rejectList: result }, meta: { status: 200, des: 'success' } });
});
reject.put('/insert', async(req, res) => {
    let result = await RejectDB.insertMany({ id: req.body.id, operation: req.body.operation, name: req.body.name, quantity: req.body.quantity, reason: req.body.reason, time: req.body.time, operator: req.body.operator, action: req.body.action });
    if (result) {
        return res.send({ result: null, meta: { status: 404, des: '创建退货信息失败' } });
    }
    res.send({ result: null, meta: { status: 200, des: 'success' } });
});
reject.get('/id', async(req, res) => {
    let result = await RejectDB.findOne({ id: req.query.id });
    if (!result) return res.send({ result: null, meta: { status: 404, des: '未知道错误订单' } });
    return res.send({ result: result, meta: { status: 200, des: "success" } });
})
module.exports = reject;