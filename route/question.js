const express = require('express');
const { QuestionDB } = require('../model/questondb');
const question = express.Router();

question.get('/question', async(req, res) => {
    console.log(req.query);
    let { pageNum, pageSize } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result = await QuestionDB.find({});
    let total = result.length;
    result = await QuestionDB.find({}).limit(pageSize - 0);
    if (!result) res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    if (pageNum > 0) {
        result = await QuestionDB.find({}).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    res.send({ result: { total: total, pageNum, questionList: result }, meta: { status: 200, des: 'Success' } });
})

question.put('/insert', async(req, res) => {
    let result = await QuestionDB.insertMany({ id: req.body.id, operation: req.body.operation, name: req.body.name, quantity: req.body.quantity, reason: req.body.reason, time: req.body.time, operator: req.body.operator });
    if (result) {
        return res.send({ result: null, meta: { status: 404, des: '创建原料问题记录失败' } });
    }
    res.send({ result: null, meta: { status: 200, des: 'success' } });
})
module.exports = question;