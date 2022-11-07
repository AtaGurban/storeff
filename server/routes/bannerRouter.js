const Router = require('express')
const bannerController = require('../controllers/bannerController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), bannerController.create)
router.get('/', bannerController.getAll)
router.put('/', checkRole('ADMIN'), bannerController.update)
router.delete('/:id',checkRole('ADMIN'), bannerController.delete) 


module.exports = router