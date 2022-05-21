const express = require('express');
const Schedule = require('../model/schedule')
const req = require("express/lib/request");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const log = require("loglevel");

const getScheduleByUserID = (req, res) => {
    Schedule.getByUser(req.params.id, (err, schedule) => {
        if (err) {
            res.send(err);
            return
        }
        res.send(schedule);
    });
}

const getScheduleByDeviceID = (req, res) => {
    Schedule.getByDevice({
        _id: req.params.id
    }, (err, schedule) => {
        if (err) {
            res.send(err);
        }
        res.json(schedule);
    });
}

const getAllSchedule = (req, res) => {
    Schedule.getAll((err, schedule) => {
        if (err) {
            res.send(err);
        }
        res.json(schedule);
    });
}

module.exports = {
    getScheduleByUserID,
    getScheduleByDeviceID,
    getAllSchedule,
}
