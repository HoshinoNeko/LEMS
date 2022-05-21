const express = require('express');
const Announcement= require('../model/announcement')
const req = require("express/lib/request");
const bodyParser = require("body-parser");
const res = require("express/lib/response");

const createNotice = (req, res) => {
    if ( req.body.uid && req.body.title && req.body.content ) {
        Announcement.createNotice(req.body.uid, req.body.title, req.body.content, (err, result) => {
            if (err) {
                res.send({
                    status: 1,
                    message: err
                })
            } else {
                res.status(200).send({
                    status: 0,
                    message: "Created successfully"
                })
            }
        })
    } else {
        res.send({
            status: 1,
            message: "Arguments required"
        })
    }
}

const delNotice = (req, res) => {
    if (!req.params.id) {
        res.send({
            status: 1,
            message: "You even did't give the id u wanna delete ok?"
        })
    } else {
        Announcement.deleteNotice(req.params.id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: 1,
                    message: err
                })
            } else {
                res.status(200).send({
                    status: 0,
                    message: "Deleted successfully"
                })
            }
        })
    }
}

const getNotice = (req, res) => {
    Announcement.getNotice((err, result) => {
        if (err) {
            res.send({
                status: 1,
                message: err
            })
        } else {
            res.send({
                status: 0,
                message: "OK",
                data: result
            })
        }
    })
}

module.exports = {
    createNotice,
    delNotice,
    getNotice,
}
