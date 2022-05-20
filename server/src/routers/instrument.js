const router = require('express').Router();
const instrument = require('../controllers/instrument');


router.get('/:id/get', instrument.getInstrument);
router.get('/', instrument.getAllInstruments);
router.post('/:id/edit', instrument.editInstrument);
router.post('/add', instrument.addInstrument);
router.delete('/:id/delete', instrument.deleteInstrument);
router.post('/getAvailable', instrument.getAvailable)
module.exports = router;
