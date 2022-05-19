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
            res.status(400).send({
                status: 1,
                message: "email or s_id can not be both empty"
            })
        } else {
            if (user) {
                console.log(user)
                if (user[0].password === md5(req.body.password)) {
                    const token = 'Bearer ' + jwt.sign(
                        { id: user[0].id, passwd: user[0].password, role: user[0].role },
                        config.system.secret,
                        { expiresIn: '24h' },
                        { algorithm: 'RS256' }
                    )
                    res.status(200).send({
                        status: 0,
                        message: "login success",
                        token: token,
                        name: user[0].name,
                        email: user[0].email,
                        reg_date: user[0].reg_date
                    });
                } else {
                    res.status(401).send({
                        status: 1,
                        message: "Invalid password"
                    });
                }
            } else {
                res.status(401).send({
                    message: "Invalid username"
                });
            }
        }
    });
}
const signup = (req, res) => {
    if ( !req.body.email || !req.body.s_id || !req.body.password || !req.body.name ) {
        res.status(400).send({
            status: 1,
            message: "You need provide enough arguments for register",
            body: req.body
        })
    } else {
        User.findOne(req.body.email, req.body.s_id, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (Object.keys(user).length !== 0) {
                    res.status(400).send({
                        status: 1,
                        message: "email or s_id already exists"
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
                                    message: "signup success",
                                    token: token,
                                    name: user[0].name,
                                    email: user[0].email,
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
                status: false,
                message: 'Error occured',
                data: err
            })
        } else {
            res.json({
                status: true,
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

const delUser = (req, res) => {
    User.deleteOne(req.body.id, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({
                status: 0,
                message: "user delete success"
            });
        }
    });
}

const updatePW = (req, res) => {
    if ( req.body.password_old) {
        User.findOne(req.body.email, req.body.s_id, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (user[0].password === md5(req.body.password_old)) {
                    User.updatePW(req.body.id, md5(req.body.password), (err, user) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.status(200).send({
                                status: 0,
                                message: "user update success"
                            });
                        }
                    });
                } else {
                    res.status(400).send({
                        status: 1,
                        message: "password is not correct"
                    });
                }
            }
        });
    } else {
        User.updatePW(req.body.id, md5(req.body.password), (err, user) => {
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
    if (!req.body.id && !req.params.id && !req.decoded.id) {
        res.status(400).send({
            status: 1,
            message: "argument not enough or null"
        });
    } else {
        let id = req.decoded.id || req.body.id || req.params.id
        User.findOne(this.id, (err, user) => {
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
    updatePW
};
