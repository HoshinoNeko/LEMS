const express = require('express');
const User = require('../model/user')
const req = require("express/lib/request");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const md5 = require('md5')
const log = require("loglevel");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require("path");
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "./../config/config.json"), 'utf8'));

const login = (req, res) => {
    User.findOne(req.body.email, req.body.s_id, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else if ( !req.body.email && !req.body.s_id) {
            console.log(req.body.email, req.body.email);
            res.status(200).send({
                status: 1,
                message: "email or s_id can not be both empty"
            })
        } else {
            console.log(user)
            console.log(JSON.stringify(user))
            if (JSON.stringify(user) !== '[]') {
                if (user[0].password === md5(req.body.password)) {
                    const token = 'Bearer ' + jwt.sign(
                        { id: user[0].id, passwd: user[0].password, role: user[0].role, email: user[0].email, s_id: user[0].s_id, sname: user[0].sname },
                        config.system.secret,
                        { expiresIn: '24h' },
                        { algorithm: 'RS256' }
                    )
                    res.status(200).send({
                        status: 0,
                        message: "登录成功",
                        token: token,
                        id: user[0].id,
                        s_id: user[0].s_id,
                        name: user[0].name,
                        email: user[0].email,
                        role: user[0].role,
                        reg_date: user[0].reg_date
                    });
                } else {
                    res.status(200).send({
                        status: 1,
                        message: "密码错误，请重新输入"
                    });
                }
            } else {
                res.status(200).send({
                    status: 1,
                    message: "用户名不存在，请检查输入"
                });
            }
        }
    });
}
const signup = (req, res) => {
    if ( !req.body.email || !req.body.s_id || !req.body.password || !req.body.name ) {
        res.status(400).send({
            status: 1,
            message: "参数不足，请检查输入",
            body: req.body
        })
    } else {
        User.findOne(req.body.email, req.body.s_id, (err, user) => {
            if (err) {
                res.status(200).send(err);
            } else {
                if (Object.keys(user).length !== 0) {
                    res.status(200).send({
                        status: 1,
                        message: "该邮箱或内部ID已被注册"
                    });
                } else {
                    User.create([req.body.name, req.body.email, req.body.s_id, md5(req.body.password)], (err, user) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            User.findOne(req.body.email, req.body.s_id, (err, user) => {
                                const token = 'Bearer ' + jwt.sign(
                                    { id: user[0].id, passwd: user[0].password, role: user[0].role },
                                    config.system.secret,
                                    { expiresIn: '24h' },
                                    { algorithm: 'RS256' }
                                )
                                log.debug("User " + user[0].id + " registered successfully USER_NAME: " + user[0].sname + " User_EMAIL: " + user[0].email);
                                res.status(200).send({
                                    status: 0,
                                    message: "恭喜你，注册成功:)",
                                    token: token,
                                    id: user[0].id,
                                    s_id: user[0].s_id,
                                    name: user[0].name,
                                    email: user[0].email,
                                    role: user[0].role,
                                    reg_date: user[0].reg_date
                                });
                            })
                        }
                    });
                }
            }
        });
    }
}
const findall = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.json({
                status: 0,
                message: 'Error occured',
                data: err
            })
        } else {
            res.json({
                status: 1,
                message: 'User List',
                data: data
            })
        }
    })
}

const addUser = (req, res) => {
    User.create([req.body.name, req.body.email, req.body.s_id, md5(req.body.password)], (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({
                status: 0,
                message: "user create success"
            });
        }
    });
}

const addUserInAdmin = (req, res) => {
    User.createInAdmin(req.body.name, req.body.email, req.body.s_id, req.body.role, md5(req.body.password), (err, user) => {
        console.log(req.body.name, req.body.email, req.body.s_id, req.body.role, md5(req.body.password))
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({
                status: 0,
                message: "user create success"
            });
        }
    });
}

const delUser = (req, res) => {
    User.deleteOne(req.body.id, (err, user) => {
        if (err) {
            return res.status(200).send({status: 1, message: err});
        } else {
            return res.status(200).send({
                status: 0,
                message: "user delete success"
            });
        }
    });
}

const updatePW = (req, res) => {
    console.log(req.decoded + req.body.oldPW + req.body.newPW)
    if ( req.body.oldPW ) {
        User.findPWByID(req.decoded.id, (err, oldpassword) => {
            if (err) {
                return res.status(200).send("用户不存在捏")
            } else {
                if (md5(req.body.oldPW) === oldpassword && req.body.newPW) {
                    User.updatePW(req.decoded.id, md5(req.body.newPW), (err, result) => {
                        if(err) {
                            return res.status(200).send({
                                status: 1,
                                message: "修改失败"
                            })
                        } else {
                            return res.status(200).send({
                                status: 0,
                                message: "密码修改成功"
                            })
                        }
                    })
                } else {
                    return res.status(200).send({
                        status: 1,
                        message: "旧密码不匹配"
                    })
                }
            }
        })
    } else {
        User.updatePW(req.body.id, md5(req.body.password), (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({
                    status: 0,
                    message: "密码修改成功"
                });
            }
        });
    }
}

const updateUser = (req, res) => {
    if ( !req.body.id || !req.body.s_id || !req.body.name || !req.body.email || !md5(req.body.password) || !req.body.enable || !req.body.role || !req.body.remark) {
        res.status(400).send({
            status: 1,
            message: "argument not enough or null"
        });
    } else {
        User.updateOne(req.body.id, req.body.s_id, req.body.name, req.body.email, md5(req.body.password), req.body.enable, req.body.role, req.body.remark, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({
                    status: 0,
                    message: "user update success"
                });
            }
        });
    }
}

const findOne = (req, res) => {
    if (!req.body.id && !req.params.id) {
        res.status(400).send({
            status: 1,
            message: "argument not enough or null"
        });
    } else {
        let id = req.decoded.id || req.body.id
        User.findByID(id, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({
                    status: 0,
                    message: "user find success",
                    data: user
                });
            }
        });
    }
}

const banOne = (req, res) => {
    let id = req.body.id || req.params.id;
    User.banOne(id, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({
                status: 0,
                message: "User banned"
            })
        }
    })
}

const unBanOne = (req, res) => {
    let id = req.body.id || req.params.id;
    User.unbanOne(id, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({
                status: 0,
                message: "User banned"
            })
        }
    })
}

const test = (req, res) => {
    res.end('test')
}

//export controller functions
module.exports = {
    login,
    signup,
    findall,
    findOne,
    addUser,
    delUser,
    updateUser,
    updatePW,
    addUserInAdmin,
    banOne,
    unBanOne,
};
