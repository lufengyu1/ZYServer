const express = require('express');
const { MaterialInfoDB } = require('../model/materialInfodb');
const { SupplierDB } = require('../model/supplierdb');
const { StockDB } = require("../model/stockdb")
const materialInfo = express.Router();
materialInfo.get('/materialInfo', async(req, res) => {
    // 将供应商的原料保存到数据库里
    // const list = await SupplierDB.find({});
    // const array = await MaterialInfoDB.find({});
    // MaterialInfoDB.deleteMany({}, (err) => {
    //     if (err) console.log(err);
    // });
    // let insertList = [];
    // for (obj of list) {
    //     for (obj1 of obj.children) {
    //         insertList.push(obj1);
    //     }
    // }
    // MaterialInfoDB.insertMany(insertList)
    let { query, pageNum, pageSize } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result = await MaterialInfoDB.find({ name: { $regex: query } });
    let total = result.length;
    console.log(total);
    result = await MaterialInfoDB.find({ name: { $regex: query } }).limit(pageSize - 0);
    if (!result) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    if (pageNum > 0) {
        result = await MaterialInfoDB.find({ name: { $regex: query } }).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    res.send({ result: { total, pageNum, materialInfo: result }, meta: { status: 200, des: 'Success' } });
});

module.exports = materialInfo