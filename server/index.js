const express = require('express');
const fs = require('fs')
const log = require('loglevel');
const configPath = './src/config/config.json';
const cors = require('cors')

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
let logLevel = config.system.log.level || 'error'
log.setLevel(logLevel);
log.debug(config);

const app = express();
const corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
const api = require('./src/routers/api')
app.use('/api', api)
const PORT = config.server.port || 8080;
app.listen(PORT,() => {
    log.info(`Starting server on port ${config.server.port}`);
})

