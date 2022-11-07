const {Banner} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path');

class BannerController {
    async create (req, res, next){
        try {
            
            const {name} = req.body
            const {imgFile} = req.files
            
            let img = uuid.v4() + '.jpg'
            
            
            imgFile.mv(path.resolve(__dirname, '..', 'files', 'images', img)) 
            const banner = await Banner.create({name, img})
            
            return res.json(banner)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async update(req, res){
        const banner = req.body
        let id = banner.id
        let img = req.files 
        if (img.img){
            img = img.img
            let imgName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'files', 'images', imgName))
            banner.img = imgName
        }
        if(!banner.id){
            res.status(400).json({message: 'ID yok'}) 
        }
        const updatedPost = await Banner.update(banner, {where: {id}})
        return res.json(updatedPost)
    }

    async getAll (req, res){
        const banners = await Banner.findAll()
        return res.json(banners)
    }

    async delete (req, res){
        const {id} = req.params     
        const banner = await Banner.findOne({where:{id}})
        banner.destroy()
        return res.json(banner)
    }
}

module.exports = new BannerController()