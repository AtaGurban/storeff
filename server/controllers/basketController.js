const {BasketDevice, Basket} = require('../models/models')
const ApiError = require('../error/ApiError')


class BasketController {
    async create (req, res, next){
        try {
            
            const {userId, deviceId, prodPrice} = req.body
            const basket = await Basket.findOne({where: {userId}})
            
            const basketDevice = await BasketDevice.create({basketId: basket.id, deviceId, productPrice:prodPrice})
            
            return res.json(basketDevice)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }


    async getAll (req, res){
        const {userId} = req.query
        const basket = await Basket.findOne({where: {userId}})
        const basketDevices = await BasketDevice.findAll({where:{basketId: basket.id}}) 
        return res.json(basketDevices)
    } 

    async delete (req, res){
        console.log('fdf');
        const {id} = req.params     
        const basketDevice = await BasketDevice.findOne({where:{deviceId:id}})
        basketDevice.destroy()
        return res.json(basketDevice)
    }
}

module.exports = new BasketController()