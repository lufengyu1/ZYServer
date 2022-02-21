const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//数据库连接
require('./model/connect');
//处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 解决跨域
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//路由模块化
const user = require("./route/user");
const menu = require("./route/menu");
const materialInfo = require("./route/materialInfo");
const supplier = require("./route/supplier");
const register = require('./route/register')
const bill = require("./route/bill")
const stock = require("./route/stock");
const isssuance = require('./route/isssuance');
const question = require('./route/question');
app.use("/user", user);
app.use("/menu", menu);
app.use("/materialInfo", materialInfo);
app.use('/supplier', supplier);
app.use('/bill', bill);
app.use('/register', register);
app.use('/stock', stock);
app.use('/isssuance', isssuance);
app.use('/question', question);


app.listen(3000, () => {
    console.log("服务器已经启动");
})