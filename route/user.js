const express = require('express');
const user = express.Router();
const { UserDB } = require('../model/userdb');
const Token = require('../fun/jwt');

// 登录
user.post('/login', async(req, res) => {
    let result = await UserDB.findOne(req.body);
    // 没有数据
    if (!result) return res.send({ result: null, meta: { status: 404, des: "登录失败，账号或者密码错误" }, token: null });
    // 用户被禁用
    if (!result.state) return res.send({ result: null, meta: { statue: 404, des: "账号已被禁用" } });
    // 用户已经登录
    if (result.isLogin) {
        return res.send({ result: null, meta: { status: 404, des: "登录失败，账号已登录" }, token: null })
    }
    // 登录成功
    let token = Token.generateToken(user.id);
    return res.send({ result: result, meta: { status: 200, des: "登录成功" }, token: token })
});

// 获取用户列表
user.get('/users', async(req, res) => {
    let { query, pageNum, pageSize } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    // 分页 模糊查询 pageSize要转换为数字
    let result = await UserDB.find({ username: { $regex: query } });
    let total = result.length;
    result = await UserDB.find({ username: { $regex: query } }).limit(pageSize - 0);
    if (pageNum > 0) {
        result = await UserDB.find({ username: { $regex: query } }).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    }
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: { total, pageNum, users: result }, meta: { status: 200, des: 'success' } })
});

// 更新用户信息
user.put('/update', async(req, res) => {
    let result = await UserDB.updateOne({ _id: req.body._id }, req.body.userInfo);
    if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "用户信息更新失败" } });
    return res.send({ result: null, meta: { status: 200, des: "更新成功" } })
});

// 添加用户
user.put('/add', async(req, res) => {
    let exist = await UserDB.findOne({ username: req.body.username });
    let exist1 = await UserDB.findOne({ idcard: req.body.idcard })
    if (exist) {
        return res.send({ result: null, meta: { status: 404, des: "用户名已存在" } });
    } else {
        if (exist1) {
            return res.send({ result: null, meta: { status: 404, des: "身份证号已存在" } });
        } else {
            let result = await UserDB.insertMany(req.body);
            if (result) {
                res.send({ res: null, meta: { status: 200, des: "success" } });
            }
        }
    }
});

// 根据id删除用户
user.delete('/delete', async(req, res) => {
    let result1 = await UserDB.findOne({ _id: req.query._id })
    if (!result1) return res.send({ result: null, meta: { status: 404, des: "用户删除失败" } });
    let result2 = await UserDB.deleteOne({ _id: req.query._id });
    if (result2.deletedCount > 0) return res.send({ result: null, meta: { status: 200, des: "success" } });
});

// 根据id返回用户信息
user.get('/userinfo', async(req, res) => {
    let result = await UserDB.findOne(req.query);
    if (!result) return res.send({ result: null, meta: { status: 404, des: "未查询到该用户" } });
    return res.send({ result: result, meta: { status: 200, des: "success" } });
});

// 根据部门返回用户列表
user.get('/department', async(req, res) => {
    let { query, pageNum, pageSize } = req.query;
    if (!pageNum || !pageSize) return res.send({ result: null, meta: { status: '404', des: '参数错误' } });
    let result = await UserDB.find({ department: { $regex: query } })
    let total = result.length;
    result = await UserDB.find({ department: { $regex: query } }).skip((pageNum - 1) * pageSize).limit(pageSize - 0);
    if (!result) return res.send({ result: null, meta: { status: 404, des: '数据库错误' } });
    return res.send({ result: { total: total, pageNum, users: result }, meta: { status: 200, des: 'success' } })
});

// 更新角色
user.put('/updaterole', async(req, res) => {
    let result = await UserDB.updateOne({ _id: req.body._id }, { role: req.body.role });
    if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "用户角色更新失败" } });
    return res.send({ result: null, meta: { status: 200, des: "更新成功" } })
});

// 更新部门
user.put('/updatedep', async(req, res) => {
    let result = await UserDB.updateOne({ _id: req.body._id }, { department: req.body.department });
    if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "用户部门更新失败" } });
    return res.send({ result: null, meta: { status: 200, des: "更新成功" } })
});

//找回密码
user.put('/newpassword', async(req, res) => {
    let exist = await UserDB.findOne({ username: req.body.username });
    if (!exist) return res.send({ result: null, meta: { status: 404, des: '用户名不存在' } });
    let result = await UserDB.updateOne({ username: req.body.username }, { password: req.body.password });
    if (req.body.password === exist.password) return res.send({ result: null, meta: { status: 404, des: "密码不能与近期相同" } });
    if (!result.acknowledged || !result.modifiedCount) return res.send({ result: null, meta: { status: 404, des: "用户密码更新失败" } });
    return res.send({ result: null, meta: { status: 200, des: 'success' } });
})
module.exports = user;