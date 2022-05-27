const express = require('express');
const isssuance = express.Router();
const { IsssuanceDB } = require('../model/isssuancedb');
const { BillDB } = require('../model/billdb');
// 获取出库列表
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
// 插入新的
isssuance.put('/insert', async(req, res) => {
    let info = await BillDB.findOne({ _id: req.body.id });
    let i = { supplier: info.supplier, name: info.name, time: req.body.time, quantity: info.quantity, state: 0, userable: info.quantity, todo: 0, des: info.des };
    let result = await IsssuanceDB.insertMany(i);
    if (!result) {
        return res.send({ result: null, meta: { status: 404, des: '出库信息创建失败' } });
    }
    return res.send({ result: null, meta: { status: 200, des: 'success' } });
});
// 审核完成 更新出库列表的 quantity和todo
isssuance.put('/update', async(req, res) => {
    let result = await IsssuanceDB.findOne({ _id: req.body.id });
    let r = null;
    if (!result) return res.send({ result: null, meta: { status: 404, des: '出库信息无数据' } });
    // 当全部出库，删除记录
    if (result.quantity * 1 - req.body.quantity * 1 === 0) {
        r = await IsssuanceDB.deleteOne({ _id: req.body.id, });
    } else {
        if (req.body.action !== '退回仓库') {
            r = await IsssuanceDB.updateOne({ _id: req.body.id }, { quantity: result.quantity * 1 - req.body.quantity * 1, todo: result.todo * 1 - req.body.quantity });
        } else {
            r = await IsssuanceDB.updateOne({ _id: req.body.id }, { userable: result.userable * 1 + req.body.quantity * 1, todo: result.todo * 1 - req.body.quantity });
        }
    }
    if (!r.acknowledged) return res.send({ result: null, meta: { status: 404, des: '更新失败' } });
    res.send({ result: null, meta: { status: 200, des: 'success' } });
});
// 未审核时更新出库列表的 待处理和当前可用
isssuance.put('/update1', async(req, res) => {
    let info = await IsssuanceDB.findOne({ _id: req.body.id });
    if (!info) return res.send({ result: null, meta: { status: 404, des: '出库信息无数据' } });
    if (info.userable * 1 - req.body.quantity < 0) {
        return res.send({ result: null, meta: { status: 404, des: '库存不足' } });
    }
    let result = await IsssuanceDB.updateOne({ _id: req.body.id }, { userable: info.userable - req.body.quantity, todo: info.todo + req.body.quantity });
    if (!result.acknowledged) return res.send({ result: null, meta: { status: 404, des: '更新失败' } });
    return res.send({ result: null, meta: { status: 200, des: 'success' } })
})
module.exports = isssuance;