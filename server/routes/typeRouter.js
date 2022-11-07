const Router = require('express')
const typeController = require('../controllers/typeController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/',checkRole('ADMIN'), typeController.create)
router.put('/',checkRole('ADMIN'), typeController.update)
router.delete('/:id',checkRole('ADMIN'), typeController.delete)
router.get('/', typeController.getAll)


module.exports = router