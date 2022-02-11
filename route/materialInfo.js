const express = require('express');
const { MaterialInfoDB } = require('../model/materialInfodb');
const materialInfo = express.Router();
materialInfo.get('/materialInfo', async(req, res) => {
    let { pageNum, pageSize } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result = await MaterialInfoDB.find({});
    let total = result.length;
    result = await MaterialInfoDB.find({}).limit(pageSize - 0);
    if (!result) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    if (pageNum > 0) {
        result = await MaterialInfoDB.find({}).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    res.send({ result: { total, pageNum, materialInfo: result }, meta: { status: 200, des: 'Success' } });
})
module.exports = materialInfo