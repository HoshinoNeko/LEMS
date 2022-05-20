const router = require('express').Router();
const incident = require('../controllers/incident');

router.post('/newIncident', incident.newIncident);
router.get('/getAllIncident', incident.getAllIncident);
router.get('/:id/getIncident', incident.getIncidentByID);
router.get('/:id/approval', incident.approvalIncident);

module.exports = router
