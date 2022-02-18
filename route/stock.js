const express = require('express');
const stock = express.Router();
const { StockDB } = require('../model/stockdb');
const { BillDB } = require('../model/billdb');

stock.get('/stock', async(req, res) => {
    const { pageNum, pageSize } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result = await StockDB.find({});
    const total = result.length;
    result = await StockDB.find({}).limit(pageSize - 0);
    if (!result) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    if (pageNum > 0) {
        result = await StockDB.find({}).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    res.send({ result: { total, pageNum, stockList: result }, meta: { status: 200, des: 'Success' } });
});
stock.put('/update', async(req, res) => {
    let info = await BillDB.findOne({ _id: req.body.id });
    let result = await StockDB.findOne({ name: info.name });
    let r = null;
    if (!result) {
        r = await StockDB.insertMany({ name: info.name, quantity: info.quantity, limit: 1000 });
    } else {
        if (req.body.operation === 0)
            r = await StockDB.updateOne({ name: info.name }, { quantity: info.quantity + result.quantity });
        else
            r = await StockDB.updateOne({ name: info.name }, { quantity: result.quantity - info.quantity });
    }
    res.send({ result: null, meta: { status: 200, des: 'success' } });
})

module.exports = stock