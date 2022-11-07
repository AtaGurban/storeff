const Router = require('express')
const subDeviceController = require('../controllers/subDeviceController')
const router = new Router()


router.post('/', subDeviceController.create)
router.get('/:id', subDeviceController.getById)
router.delete('/:id', subDeviceController.delete)




module.exports = router