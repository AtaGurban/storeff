const { Order} = require('../models/models')

const ApiError = require('../error/ApiError')

class OrderController {
    async getAll(req, res){
        const page = req.query.page || 1;
        const limit = 10;
        const offset = (page - 1) * limit;
        const orders = await Order.findAndCountAll({ offset, limit });
        return res.json(orders)
    }

}

module.exports = new OrderController()