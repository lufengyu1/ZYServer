const express = require('express');
const menu = express.Router();
const { MenuDB } = require('../model/menudb');
menu.get('/', async(req, res) => {
    let result = await MenuDB.find({}).sort({ id: 1 });
    if (!result) res.send({ result: null, meta: { status: 404, des: "数据库出错" } });
    res.send({
        result: result,
        meta: { status: 200, des: "success" }
    });
})
module.exports = menu