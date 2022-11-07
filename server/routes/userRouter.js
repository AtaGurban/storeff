const Router = require('express')

const UserControllers = require('../controllers/UserControllers')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()




router.post('/registration', UserControllers.registration)
router.post('/login', UserControllers.login)
router.get('/auth', authMiddleware, UserControllers.check)

module.exports = router