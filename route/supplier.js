const express = require('express');
const supplier = express.Router();
const { SupplierDB } = require('../model/supplierdb');
const { MaterialInfoDB } = require('../model/materialInfodb');

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
});
// 天添加供应商信息
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
});
// 添加供应商原料信息
supplier.put('/updateMaterial', async(req, res) => {
    for (item of req.body.children) {
        if (item.name === req.body.info.name) return res.send({ result: null, meta: { status: 404, des: '原料已存在' } });
    }
    req.body.children.push(req.body.info);
    let result = await SupplierDB.updateOne({ _id: req.body._id }, { children: req.body.children });
    if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "供应商原料信息更新失败" } });
    //  更新原料库
    const list = await SupplierDB.find({});
    const array = await MaterialInfoDB.find({});
    MaterialInfoDB.deleteMany({}, (err) => {
        if (err) console.log(err);
    });
    let insertList = [];
    for (obj of list) {
        for (obj1 of obj.children) {
            insertList.push(obj1);
        }
    }
    MaterialInfoDB.insertMany(insertList)
    return res.send({ result: req.body.children, meta: { status: 200, des: 'success' } });
});
// 修改供应商信息
supplier.put('/update', async(req, res) => {
    console.log(req.body);
    let result = await SupplierDB.updateOne({ _id: req.body._id }, req.body);
    if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "用户信息更新失败" } });
    return res.send({ result: null, meta: { status: 200, des: "更新成功" } })
})
module.exports = supplier