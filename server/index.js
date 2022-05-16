const express = require('express');
const app = new express()
const fs = require('fs')
const bodyParser = require('body-parser')
const log = require('loglevel');
const configPath = './src/config/config.json';
const sql = require('./model/db.js')

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
let logLevel = config.system.log.level || 'error'
log.setLevel(logLevel);
log.debug(config);


sql.query('SELECT * FROM `users`', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});
