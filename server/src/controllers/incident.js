const express = require('express');
const Incident= require('../model/incident')
const req = require("express/lib/request");
const bodyParser = require("body-parser");
const res = require("express/lib/response");

const newIncident = (req, res) => {
    Incident.newIncident(req.body.uid, req.body.iid, req.body.title, req.body.content, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 1,
                message: err.message
            });
        } else {
            res.status(200).json({
                status: 0,
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
                status: 1,
                message: err.message
            });
        } else {
            res.status(200).json({
                status: 0,
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
                status: 1,
                message: err.message
            });
        } else {
            res.status(200).json({
                status: 0,
                message: "Incident fetched successfully",
                data: callback
            });
        }
    });
}

const solveIncident = (req, res) => {
    Incident.solveIncident(req.params.id, (err, callback) => {
        if (err) {
            res.status(500).json({
                status: 1,
                message: err.message
            });
        } else {
            res.status(200).json({
                status: 0,
                message: "Incident Solved successfully"
            });
        }
    });
}
const confirmIncident = (req, res) => {
    Incident.confirmIncident(req.params.id, (err, callback) => {
        if (err) {
            res.status(500).json({
                status: 1,
                message: err.message
            });
        } else {
            res.status(200).json({
                status: 0,
                message: "Incident Confirmed"
            });
        }
    });
}
const deleteIncident = (req, res) => {
    Incident.solveIncident(req.params.id, (err, callback) => {
        if (err) {
            res.status(500).json({
                status: 1,
                message: err.message
            });
        } else {
            res.status(200).json({
                status: 0,
                message: "Incident Deleted"
            });
        }
    });
}

module.exports = {
    newIncident,
    getAllIncident,
    getIncidentByID,
    solveIncident,
    confirmIncident,
    deleteIncident,

}
