const router = require('express').Router();
const incident = require('../controllers/incident');

router.post('/newIncident', incident.newIncident);
router.get('/getAllIncident', incident.getAllIncident);
router.get('/:id/getIncident', incident.getIncidentByID);
router.get('/:id/solve', incident.solveIncident);
router.post('/:id/solve', incident.solveIncident);
router.get('/:id/confirm', incident.confirmIncident);
router.get('/:id/delete', incident.deleteIncident);
module.exports = router
