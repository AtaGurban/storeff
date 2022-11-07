const Router = require('express')
const TitleType = require('../controllers/titleTypeController')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router()



router.post('/', TitleType.create)
router.put('/',checkRole('ADMIN'), TitleType.update)
router.delete('/:id',checkRole('ADMIN'), TitleType.delete)
router.get('/', TitleType.getAll)


module.exports = router