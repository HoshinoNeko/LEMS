const router = require('express').Router();
const user = require('../controllers/user');

router.get('/', user.findOne);
router.get('/findOne', user.findOne);
router.post('/findOne', user.findOne);
router.post('/signup', user.signup);
router.get('/findall', user.findall);
router.get('/login', user.login);
router.post('/login', user.login);
router.post('/addUser', user.addUser);
router.post('/delUser', user.delUser);
router.post('/updateUser', user.updateUser);
router.post('/updatePW', user.updatePW)
router.post('/createUser', user.addUserInAdmin)
router.get('/:id/ban', user.banOne)
router.post('/banOne', user.banOne)
router.get('/:id/unban', user.unBanOne)
router.post('/unbanOne', user.unBanOne)
module.exports = router
