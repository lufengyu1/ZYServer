const express = require('express');
const user = express.Router();
const { UserDB } = require('../model/userdb');
const Token = require('../fun/jwt');

user.post('/login', async(req, res) => {
    let result = await UserDB.findOne(req.body);
    // 没有数据
    if (!result) return res.send({ result: null, meta: { status: 404, des: "登录失败，账号或者密码错误" }, token: null });
    // 用户已经登录
    if (result.isLogin) {
        return res.send({ result: null, meta: { status: 404, des: "登录失败，账号已登录" }, token: null })
    }
    // 登录成功
    let token = Token.generateToken(user.id);
    return res.send({ result: result, meta: { status: 200, des: "登录成功" }, token: token })
})
module.exports = user;