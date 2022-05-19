const fs = require('fs');
const mysql = require('mysql');
const configPath = './src/config/config.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const connection = mysql.createPool(config.db)

module.exports = connection
