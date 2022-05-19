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
    Instrument.editDevice(req.params.id, req.body, (err, instrument) => {
        if (err) {
            res.json({
                success: 1,
                msg: 'Failed to edit instrument'
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
    Instrument.newDevice(req.body, (err, instrument) => {
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
                success: 1,
                msg: 'Failed to delete instrument'
            });
        } else {
            res.json({
                success: 0,
                msg: 'Instrument deleted',
            });
        }
    });
}

module.exports = {
    getInstrument,
    getAllInstruments,
    editInstrument,
    addInstrument,
    deleteInstrument
}
