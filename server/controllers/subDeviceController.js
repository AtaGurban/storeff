const uuid = require('uuid')
const path = require('path');
const { SubDevice, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class SubDeviceController {
    async create(req, res, next) {
        try {
            let {  price, deviceId, subDeviceInfo } = req.body;

            const subDevice = await SubDevice.create({ price, deviceId})

            if (subDeviceInfo){
                subDeviceInfo = JSON.parse(subDeviceInfo)

                subDeviceInfo.map(i =>{
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        subDeviceId: subDevice.id
                    })
                })
            }
            return res.json(subDevice)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            const subDevices = await SubDevice.findAll({ where: { deviceId: id}, include: [{model : DeviceInfo, as: 'info'}] })
            return res.json(subDevices)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async delete (req, res){
        const {id} = req.params     
        const subDevice = await SubDevice.destroy({where:{id}})
        const info = await DeviceInfo.destroy({where: {subDeviceId: null}})

        
        // info.destroy()
        return res.json(subDevice)
    }

  
}

module.exports = new SubDeviceController()