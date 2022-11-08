const { SubType, Category } = require('../models/models')
const ApiError = require('../error/ApiError')

class SubTypeController {
    async create(req, res) {
        let { name, titleTypeId } = req.body
        let subType = await SubType.create({ name, titleTypeId })
        const subTypeId = subType.id
        const catId = await Category.create({subTypeId})
        return res.json(subType)
    }

    async getAll(req, res) {
        const subTypes = await SubType.findAll()
        return res.json(subTypes)
    }

    async delete(req, res) {
        const { id } = req.params
        const subType = await SubType.destroy({ where: { id } })

        return res.json(subType)
    }

    async update(req, res) { 
        const type = req.body;
        if (!type.titleTypeId) {
            res.status(400).json({ message: "bash kategoriya gorkezilmedik" });
        } else {
            let { id } = req.body

            const updatedPost = await SubType.update(type, { where: { id } })

            return res.json(updatedPost)
        }

    }
}

module.exports = new SubTypeController()