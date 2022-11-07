const { TitleType, Category} = require("../models/models");
const ApiError = require("../error/ApiError");

class TitleTypeController {
  async create(req, res, next) {
    try {
      let { name, typeId } = req.body;

      let titleType = await TitleType.create({ name, typeId });
      const titleTypeId = titleType.id
      const catId = await Category.create({titleTypeId})
      return res.json(titleType);
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }


  }

  async getAll(req, res) {
    const titleTypes = await TitleType.findAll();
    return res.json(titleTypes);
  }
  async update(req, res) {
    const type = req.body;
    if (!type.typeId) {
      res.status(400).json({ message: "bash kategoriya gorkezilmedik" });
    }
    let {id} = req.body

    const updatedPost = await TitleType.update(type, {where: {id}})

    return res.json(updatedPost)
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const titleType = await TitleType.destroy({ where: { id } });

      return res.json(titleType);
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }

  }
}

module.exports = new TitleTypeController();
