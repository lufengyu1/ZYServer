const express = require('express');
const user = express.Router();
const UserDB = require('../model/userdb');
user.post('/login', async(req, res) => {
    res.send("123");
})
module.exports = user;