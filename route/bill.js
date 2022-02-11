const express = require('express');
const bill = express.Router();
const { BillDB } = require('../model/billdb');
bill.get('/bill', async(req, res) => {
    const { pageNum, pageSize } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result = await BillDB.find({});
    const total = result.length;
    result = await BillDB.find({}).limit(pageSize - 0);
    if (!result) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    if (pageNum > 0) {
        result = await BillDB.find({}).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    res.send({ result: { total, pageNum, billList: result }, meta: { status: 200, des: 'Success' } });
})
module.exports = bill