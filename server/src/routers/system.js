const router = require('express').Router();
const system = require('../controllers/system');

router.get('/status', system.getSystemStatus)
module.exports = router
