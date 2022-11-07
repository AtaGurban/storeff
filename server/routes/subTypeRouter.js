const Router = require('express')
const subTypesController = require('../controllers/subTypesController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()



router.post('/', subTypesController.create)
router.delete('/:id',checkRole('ADMIN'), subTypesController.delete)
router.put('/',checkRole('ADMIN'), subTypesController.update)
router.get('/', subTypesController.getAll)


module.exports = router