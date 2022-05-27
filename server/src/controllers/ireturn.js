const express = require('express');
const ireturn = require('../model/ireturn')
const instrument = require('../model/instrument')
const req = require("express/lib/request");
const bodyParser = require("body-parser");
const res = require("express/lib/response");

const addReturn = (req, res) => {
    ireturn.addReturn(req.body.s_id, req.body.i_id, (err, data) => {
        if (err) {
            res.json({
                status: 1,
                message: err
            });
        } else {
            res.json({
                status: 0,
                message: data
            });
        }
    });
}

const getAllReturn = (req, res) => {
    ireturn.getAllReturn((err, data) => {
        if (err) {
            res.json({
                status: 1,
                message: err
            });
        } else {
            res.json({
                status: 0,
                data: data
            });
        }
    });
}

const getReturnByID = (req, res) => {
    ireturn.getReturnByID(req.params.id, (err, data) => {
        if (err) {
            res.json({
                status: 1,
                message: err
            });
        } else {
            res.json({
                status: 0,
                message: data
            });
        }
    });
}

const approveReturn = (req, res) => {
    ireturn.approveReturn(req.params.id, req.body.i_id, (err, data) => {
        if (err) {
            res.json({
                status: 1,
                message: err,
                data: data
            });
        }
        res.json({status: 0, message: "ok"})
    });
}

const rejectReturn = (req, res) => {
    ireturn.rejectReturn(req.params.id, (err, data) => {
        if (err) {
            res.json({
                status: 1,
                message: err,
                data: data
            });
        }
        res.json({status: 0, message: "ok"})
    });
}

const getUndoneReturn = (req, res) => {
    ireturn.getUndoneReturn((err, data) => {
        if (err) {
            res.json({
                status: 1,
                message: err
            });
        } else {
            res.json({
                status: 0,
                data: data
            });
        }
    });
}

module.exports = {
    addReturn,
    getAllReturn,
    getReturnByID,
    approveReturn,
    getUndoneReturn,
    rejectReturn,
}
