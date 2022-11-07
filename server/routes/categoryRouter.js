const Router = require('express')
const categoryController = require('../controllers/categoryController')
const router = new Router()



router.get('/', categoryController.getAll)



module.exports = router