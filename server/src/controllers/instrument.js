const express = require('express');
const Instrument = require('../model/instrument')
const req = require("express/lib/request");
const bodyParser = require("body-parser");
const res = require("express/lib/response");

const getInstrument = (req, res) => {
    Instrument.getDevice(req.params.id, (err, instrument) => {
        if (err) {
            res.json({
                success: 1,
                msg: 'Failed to get instrument'
            });
        } else {
            console.log(req.body)
            res.json({
                success: 0,
                instrument: instrument
            });
        }
    });
}

const getAllInstruments = (req, res) => {
    Instrument.getAllDevice((err, instruments) => {
        if (err) {
            res.json({
                success: 1,
                msg: 'Failed to get instruments'
            });
        } else {
            res.json({
                success: 0,
                instruments: instruments
            });
        }
    });
}

const editInstrument = (req, res) => {
    Instrument.editDevice(req.params.id, req.body.name, req.body.symbol, req.body.location, req.body.instruction, req.body.enable, req.body.remark, req.body.department, (err, instrument) => {
        if (err) {
            res.json({
                status: 1,
                message: 'Failed to edit instrument'
            });
        } else {
            res.json({
                success: 0,
                msg: 'Instrument updated',
                instrument: instrument
            });
        }
    });
}

const addInstrument = (req, res) => {
    Instrument.newDevice(req.body.name, req.body.symbol, req.body.location, req.body.instruction, req.body.enable, req.body.remark, req.body.department, (err, instrument) => {
        if (err) {
            res.json({
                success: 1,
                msg: 'Failed to add instrument'
            });
        } else {
            res.json({
                success: 0,
                msg: 'Instrument added',
                instrument: instrument
            });
        }
    });
}

const deleteInstrument = (req, res) => {
    Instrument.delDevice(req.params.id, (err, instrument) => {
        if (err) {
            res.json({
                status: 1,
                message: err
            });
        } else {
            res.json({
                status: 0,
                message: 'Instrument deleted',
            });
        }
    });
}

const getAvailable = (req, res) => {
    Instrument.getAvailableDevices((err, instruments) => {
        if (err) {
            res.json({
                status: 1,
                msg: 'Failed to get instruments'
            });
        } else {
            res.json({
                status: 0,
                instruments: instruments
            });
        }
    });
}

const disableDevice = (req, res) => {
    Instrument.disableDevice(req.params.id, (err,result) => {
        if (err) {
            res.json({
                status: 1,
                message: err
            })
        } else {
            res.json({
                status: 0,
                message: "OK",
                data: result
            })
        }
    })
}

const enableDevice = (req, res) => {
    Instrument.enableDevice(req.params.id, (err,result) => {
        if (err) {
            res.json({
                status: 1,
                message: err
            })
        } else {
            res.json({
                status: 0,
                message: "OK",
                data: result
            })
        }
    })
}

const freeDevice = (id, res) => {
    Instrument.freeDevice(id, (err, instrument) => {
        if (err) {
            res.json({
                status: 1,
                msg: 'Failed to free instrument'
            });
        } else {
            res.json({
                status: 0,
                msg: 'Instrument freed',
                instrument: instrument
            });
        }
    });
}

module.exports = {
    getInstrument,
    getAllInstruments,
    editInstrument,
    addInstrument,
    deleteInstrument,
    getAvailable,
    freeDevice,
    disableDevice,
    enableDevice,
}
