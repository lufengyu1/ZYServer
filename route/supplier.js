const express = require('express');
const supplier = express.Router();
const { SupplierDB } = require('../model/supplierdb');

supplier.get('/supplier', async(req, res) => {
    const { pageNum, pageSize, query } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result = await SupplierDB.find({ name: { $regex: query } });
    const total = result.length;
    result = await SupplierDB.find({ name: { $regex: query } }).limit(pageSize - 0);
    if (!result) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    if (pageNum > 0) {
        result = await SupplierDB.find({ name: { $regex: query } }).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    res.send({ result: { total, pageNum, supplierList: result }, meta: { status: 200, des: 'Success' } });
})
supplier.put('/insert', async(req, res) => {
    console.log(req.body);
    let exist = await SupplierDB.findOne({ name: req.body.name });
    if (exist) {
        return res.send({ result: null, meta: { status: 404, des: "供应商已存在" } });
    } else {
        let result = await SupplierDB.insertMany(req.body);
        if (result) {
            res.send({ res: null, meta: { status: 200, des: 'success' } });
        }
    }
})
module.exports = supplier