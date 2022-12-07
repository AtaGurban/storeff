const Router = require('express')
const deviceController = require('../controllers/deviceController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), deviceController.create)
router.post('/excel',  deviceController.createExcel)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.put('/', checkRole('ADMIN'), deviceController.update)
router.delete('/:id', checkRole('ADMIN'), deviceController.delete)




module.exports = router