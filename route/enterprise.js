const express = require('express');
const enterprise = express.Router();
const { EnterpriseDB } = require('../model/enterprisedb');
// 获取企业信息
enterprise.get('/', async(req, res) => {
    let result = await EnterpriseDB.find({});
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: result[0], meta: { status: 200, des: 'success' } });
});
// 更新企业信息
enterprise.put('/update', async(req, res) => {
    let result = await EnterpriseDB.updateOne({ name: req.body.name }, req.body);
    if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "企业信息更新失败" } });
    return res.send({ result: null, meta: { status: 200, des: "更新成功" } });
})
module.exports = enterprise;