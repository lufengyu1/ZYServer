const express = require('express');
const supplier = express.Router();
const { SupplierDB } = require('../model/supplierdb');
const { MaterialInfoDB } = require('../model/materialInfodb');
// 获取供应商信息
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
// 添加供应商信息
supplier.put('/insert', async(req, res) => {
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
supplier.put('/insertMaterial', async(req, res) => {
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
    let result = await SupplierDB.updateOne({ _id: req.body._id }, req.body);
    if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "用户信息更新失败" } });
    return res.send({ result: null, meta: { status: 200, des: "更新成功" } })
});
// 根据id删除供应商
supplier.delete('/delete', async(req, res) => {
    let result1 = await SupplierDB.findOne({ _id: req.query._id })
    if (!result1) return res.send({ result: null, meta: { status: 404, des: "供应商删除失败" } });
    let result2 = await SupplierDB.deleteOne({ _id: req.query._id });
    if (result2.deletedCount > 0) return res.send({ result: null, meta: { status: 200, des: "success" } });
});
// 修改供应商原料信息
supplier.put('/updateMaterial', async(req, res) => {
    let result1 = await SupplierDB.findOne({ name: req.body.supplier });
    let children = result1.children;
    for (item of children) {
        if (item.name === req.body.name) {
            item.price = req.body.price;
            item.des = req.body.des;
            break;
        }
    }
    let result = await SupplierDB.updateOne({ name: req.body.supplier }, { children: children });
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
    MaterialInfoDB.insertMany(insertList);
    if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "原料信息更新失败" } });
    return res.send({ result: null, meta: { status: 200, des: "更新成功" } })
});
// 删除供应商原料
supplier.delete('/delMaterial', async(req, res) => {
    let result1 = await SupplierDB.findOne({ name: req.query.supplier });
    let children = result1.children.filter((item) => {
        return item.name !== req.query.name;
    });
    let result = await SupplierDB.updateOne({ name: req.query.supplier }, { children: children });
    if (!result.acknowledged) return res.send({ result: null, meta: { status: 404, des: '原料删除失败' } });
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
    return res.send({ result: null, meta: { status: 200, des: "更新成功" } })
});

// 根据供应商名字获取供应商信息
supplier.get("/name", async(req, res) => {
    let result = await SupplierDB.findOne({ name: req.query.name });
    res.send({ result: result, meta: { status: 201, des: 'success' } });
})
module.exports = supplier