const {Type, Category} = require('../models/models')
const fs = require('fs')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path');
class TypeController {
    async create(req, res, next){  
        try {
            
            const {name} = req.body
            const {fileOne} = req.files
            const {fileTwo} = req.files
            
            let imgOne = uuid.v4() + '.jpg'
            let imgTwo = uuid.v4() + '.jpg'
            
            fileOne.mv(path.resolve(__dirname, '..', 'files', 'images', imgOne))
            fileTwo.mv(path.resolve(__dirname, '..', 'files', 'images', imgTwo))
           
            
            const type = await Type.create({name, imgOne, imgTwo})
            const typeId = type.id
            const catId = await Category.create({typeId})
            
            return res.json(type)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)
    }

    async update (req, res){
        const type = req.body
        let id = type.id
        const imgOne = req.files ? req.files.imgOne : null
        const imgTwo = req.files ? req.files.imgTwo : null
        if (imgOne){
            let imgName = uuid.v4() + '.jpg'
            imgOne.mv(path.resolve(__dirname, '..', 'files', 'images', imgName))
            type.imgOne = imgName
        }
        if (imgTwo){
            let imgName = uuid.v4() + '.jpg'
            imgTwo.mv(path.resolve(__dirname, '..', 'files', 'images', imgName))
            type.imgTwo = imgName
        }

        if(!type.id){
            res.status(400).json({message: 'ID yok'})
            
        }
  
        const updatedPost = await Type.update(type, {where: {id}})

        return res.json(updatedPost)
    }
    async delete (req, res){
        const {id} = req.params     
        const type = await Type.findOne({where:{id}})
        fs.unlink(path.resolve(__dirname, '..', 'files', 'images', type.imgOne), function (err) {
            if (err) {console.log(err);}
        })
        fs.unlink(path.resolve(__dirname, '..', 'files', 'images', type.imgTwo), function (err) {
            if (err) {console.log(err);}
        })
        type.destroy()
        const catId = await Category.destroy({where:{typeId:id}})
        return res.json(type)
    }
}

module.exports = new TypeController()