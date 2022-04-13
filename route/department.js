const express = require('express');
const department = express.Router();
const { DepartmentDB } = require('../model/departmentdb');
// get
department.get('/', async(req, res) => {
    let result = await DepartmentDB.find({});
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: result, meta: { status: 200, des: 'success' } });
});
// // insert
department.put('/insert', async(req, res) => {
    let exist = await DepartmentDB.findOne({ name: req.body.name });
    if (exist) {
        return res.send({ result: null, meta: { status: 404, des: "部门已存在" } });
    } else {
        let result = await DepartmentDB.insertMany(req.body);
        if (result) {
            return res.send({ res: null, meta: { status: 200, des: "success" } });
        } else {
            return res.send({ result: null, meta: { status: 404, des: 'error' } });
        }
    }
});

module.exports = department;