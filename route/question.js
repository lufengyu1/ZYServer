const express = require('express');
const { QuestionDB } = require('../model/questondb');
const question = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
question.get('/question', async(req, res) => {
    let { pageNum, pageSize, query } = req.query;
    let result = null;
    let total = 0;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    if (query.trim().length === 0) {
        result = await QuestionDB.find({});
        total = result.length;
        result = await QuestionDB.find({}).sort({ time: -1 }).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    } else {
        result = await QuestionDB.find({ _id: new ObjectId(query) });
        total = result.length;
        result = await QuestionDB.find({ _id: new ObjectId(query) }).sort({ time: -1 }).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }

    res.send({ result: { total: total, pageNum, questionList: result }, meta: { status: 200, des: 'Success' } });
})

question.put('/insert', async(req, res) => {
    let result = await QuestionDB.insertMany({ id: req.body.id, operation: req.body.operation, name: req.body.name, quantity: req.body.quantity, reason: req.body.reason, time: req.body.time, operator: req.body.operator, action: req.body.action });
    if (result) {
        return res.send({ result: null, meta: { status: 404, des: '创建原料问题记录失败' } });
    }
    res.send({ result: null, meta: { status: 200, des: 'success' } });
});
module.exports = question;