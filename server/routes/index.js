const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const deviceRouter = require('./deviceRouter')
const subDeviceRouter = require('./subDeviceRouter')
const typeRouter = require('./typeRouter')
const subTypeRouter = require('./subTypeRouter')
const TitleRouter = require('./titleTypeRouter')
const bannerRouter = require('./bannerRouter')
const categoryRouter = require('./categoryRouter')
const basketRouter = require('./basketRouter')
const OrderRouter = require('./orderRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter) 
// router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/subdevice', subDeviceRouter)
router.use('/subtype', subTypeRouter)
router.use('/titletype', TitleRouter)
router.use('/banner', bannerRouter)
router.use('/category', categoryRouter)
router.use('/basket', basketRouter)
router.use('/order', OrderRouter)


module.exports = router 