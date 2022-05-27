const router = require('express').Router();
const ireturn = require('../controllers/ireturn');

router.post('/add',ireturn.addReturn)
router.get('/all',ireturn.getAllReturn)
router.post('/all',ireturn.getAllReturn)
router.post('/ByID',ireturn.getReturnByID)
router.post('/:id/approve',ireturn.approveReturn)
router.post('/:id/reject',ireturn.rejectReturn)
router.get('/undone', ireturn.getUndoneReturn)
module.exports = router
