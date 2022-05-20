const express = require('express');
const Incident= require('../model/incident')
const req = require("express/lib/request");
const bodyParser = require("body-parser");
const res = require("express/lib/response");

const newIncident = (req, res) => {
    Incident.newIncident(req.body.uid, req.body.iid, req.body.title, req.body.content, (err, data) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Incident created',
                data: data
            });
        }
    });
}

const getAllIncident = (req, res) => {
    Incident.getAllIncident((err, callback) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Incident fetched successfully",
                data: callback
            });
        }
    });
}

const getIncidentByID = (req, res) => {
    Incident.getIncidentById(req.params.id, (err, callback) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Incident fetched successfully",
                data: callback
            });
        }
    });
}

const approvalIncident = (req, res) => {
    Incident.doIncident(req.params.id, (err, callback) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Incident approved successfully"
            });
        }
    });
}

module.exports = {
    newIncident,
    getAllIncident,
    getIncidentByID,
    approvalIncident,
}
