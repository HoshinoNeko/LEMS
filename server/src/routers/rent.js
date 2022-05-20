const router = require('express').Router();
const schedule = require('../controllers/schedule');
const rent = require('../controllers/rent');

router.post('/newRent', rent.createRent);
router.get('/', schedule.getAllSchedule);
router.post('/', schedule.getAllSchedule);
router.get('/:id', schedule.getScheduleByUserID);
module.exports = router
