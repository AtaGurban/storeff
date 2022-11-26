const Router = require('express')
const orderController = require('../controllers/orderControllers')
const router = new Router()



router.get('/get-all', orderController.getAll)



module.exports = router