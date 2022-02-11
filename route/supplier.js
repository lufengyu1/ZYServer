const express = require('express');
const supplier = express.Router();
const { SupplierDB } = require('../model/supplierdb');

supplier.get('/supplier', async(req, res) => {
    const { pageNum, pageSize } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result = await SupplierDB.find({});
    const total = result.length;
    result = await SupplierDB.find({}).limit(pageSize - 0);
    if (!result) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    if (pageNum > 0) {
        result = await SupplierDB.find({}).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    res.send({ result: { total, pageNum, supplierList: result }, meta: { status: 200, des: 'Success' } });
})

module.exports = supplier