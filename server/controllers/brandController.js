const {Brand} = require('../models/models')
const fs = require('fs')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path');
class BrandController {
    async create(req, res, next){  
        try {
            
            const {name} = req.body
            const {imgFile} = req.files
            
            let img = uuid.v4() + '.jpg'
            
            
            imgFile.mv(path.resolve(__dirname, '..', 'files', 'images', img))
            
           
            
            const brand = await Brand.create({name, img})
            
            return res.json(brand)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res){
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async update (req, res){
        const brand = req.body
        let id = brand.id
        let img = req.files 
       
        if (img.img){
            img = img.img
            let imgName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'files', 'images', imgName))
            brand.img = imgName
        }

        if(!brand.id){
            res.status(400).json({message: 'ID yok'})
            
        }
  
        const updatedPost = await Brand.update(brand, {where: {id}})

        return res.json(updatedPost)
    }

    async delete (req, res){
        const {id} = req.params     
        const brand = await Brand.findOne({where:{id}})
        fs.unlink(path.resolve(__dirname, '..', 'files', 'images', brand.img), function (err) {
            if (err) {console.log(err);}
        })
        brand.destroy()
        return res.json(brand)
    }
}

module.exports = new BrandController()