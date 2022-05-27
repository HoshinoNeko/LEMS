const router = require('express').Router();
const message = require('../controllers/message');

router.get("/:rid/getMessage", message.getMessage)
router.post("/:rid/addMessage", message.addMessage)
module.exports = router
