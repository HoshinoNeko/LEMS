const router = require('express').Router();
const announcement = require('../controllers/announcement')

router.get('/', announcement.getNotice)
router.post('/new', announcement.createNotice)
router.delete('/:id/delete', announcement.delNotice)

module.exports = router
