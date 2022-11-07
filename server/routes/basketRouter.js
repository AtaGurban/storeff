const Router = require('express')
const basketController = require('../controllers/basketController')
const router = new Router()



router.post('/', basketController.create)
router.get('/', basketController.getAll)
// router.put('/', checkRole('ADMIN'), basketController.update)
router.delete('/:id', basketController.delete) 


module.exports = router