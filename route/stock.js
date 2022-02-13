const express = require('express');
const stock = express.Router();
const { StockDB } = require('../model/stockdb');

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
})

module.exports = stock