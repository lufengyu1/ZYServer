const express = require('express');
const stock = express.Router();
const { StockDB } = require('../model/stockdb');
const { IsssuanceDB } = require('../model/isssuancedb');

stock.get('/stock', async(req, res) => {
    const { pageNum, pageSize } = req.query;
    let result = null;
    let total = 0;
    // 返回全部信息
    if (pageNum === 0 && pageSize === 0) {
        result = await StockDB.find({});
        return res.send({ result: { total, stockList: result }, meta: { status: 200, des: 'Success' } });
    }
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    result = await StockDB.find({});
    total = result.length;
    result = await StockDB.find({}).limit(pageSize - 0);
    if (!result) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    if (pageNum > 0) {
        result = await StockDB.find({}).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    res.send({ result: { total, pageNum, stockList: result }, meta: { status: 200, des: 'Success' } });
});
stock.put('/update', async(req, res) => {
    let result = null;
    let r = null;
    // type=0 原料出入库更新库存
    if (req.body.type === 0) {
        if (req.body.operation === 0) {
            result = await StockDB.findOne({ name: req.body.name });
            if (!result) {
                r = await StockDB.insertMany({ name: req.body.name, quantity: req.body.quantity, limit: 1000 });
            } else {
                r = await StockDB.updateOne({ name: req.body.name }, { quantity: req.body.quantity + result.quantity });
            }
        } else if (req.body.operation === 1) {
            result = await StockDB.findOne({ name: req.body.name });
            r = await StockDB.updateOne({ name: req.body.name }, { quantity: result.quantity * 1 - req.body.quantity * 1 });
        }
    }
    // type=1 更新limit
    if (req.body.type === 1) {
        result = await StockDB.updateOne({ name: req.body.name }, { limit: req.body.limit });
    }

    res.send({ result: null, meta: { status: 200, des: 'success' } });
})

module.exports = stock