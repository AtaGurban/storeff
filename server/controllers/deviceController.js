const uuid = require("uuid");
const path = require("path");
const { Op } = require("sequelize");
const fs = require("fs");
const excelToJson = require('convert-excel-to-json');
const {
  Device,
  DeviceInfo,
  SubDevice,
  DeviceImg,
  Rating,
  DeviceDescription,
  DeviceMoreInfo,
  DeviceMoreInfoId,
  BasketDevice,
} = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
  async createExcel(req, res, next) {
    try {
      const excelFile = req.files.excel
      await excelFile.mv(path.resolve(__dirname, "..", "files", "excel", excelFile.name))
      const result = excelToJson({
        sourceFile: path.resolve(__dirname, "..", "files", "excel", excelFile.name),
      //   sheets:[{
      //     name: 'harytlar',
      //     columnToKey: {
      //       A: 'name',
      //       B: 'price',
      //       C: 'typeId',
      //       D: 'titleTypeId',
      //       E: 'favourite',
      //       F: 'smallDesc',
      //       G: 'bigDesc',
      //       H: 'code',
      //       I: 'size',
      //       J: 'color'
      //     }
      // }]
    });
    console.log(result);
      for (const key in result) {
        if (Object.hasOwnProperty.call(result, key)) {
          const products = result[key];
          for (let i = 1; i < products.length; i++) {
            const element = products[i];
            let DeviceMoreInf = [{title: 'Ölçegi', description: element['I']}, {title: 'Reňki', description: element['J']}]
            const DeviceMoreInfoIdData = await DeviceMoreInfoId.findAll();
            (DeviceMoreInf).map(async (i) => {
              try {
                DeviceMoreInfoIdData.filter(
                  (y) =>
                    y.dataValues.name.toLowerCase().trim() ===
                    i.title.toLowerCase().trim()
                ).length === 0
                  ? await DeviceMoreInfoId.create({ name: i.title.trim() })
                  : null;
                DeviceMoreInfoIdData.filter(
                  (y) => 
                    y.dataValues.name.toLowerCase().trim() ===
                    i.description.toLowerCase().trim()
                ).length === 0
                  ? await DeviceMoreInfoId.create({ name: i.description.trim() })
                  : null;
              } catch (error) {
                console.log(error);
              }
            });
            const device = await Device.create({
              name: element['A'],
              price : (+element['B']),
              typeId : (+element['C']),
              titleTypeId : (+element['D']),
              favourite : ((element['E'] === 'hawa' ? true : false)),
              code : (+element['H'])
            });
            await DeviceDescription.create({
              big : element['G'],
              little : element['F'],
              deviceId: device.id, 
            })
            if (DeviceMoreInf) { 
              DeviceMoreInf = (DeviceMoreInf);
              DeviceMoreInf.map((i) => {
                DeviceMoreInfo.create({
                  title: i.title,
                  description: i.description,
                  deviceId: device.id,
                });
              });
            }
          }
        }
    }


    fs.unlink( 
      path.resolve(__dirname, "..", "files", "excel", excelFile.name),
      function (err) {
        if (err) {
          console.log(err);
        } 
      }
    );
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async create(req, res, next) {
    try {
      const {
        name,
        price,
        typeId,
        titleTypeId,
        favourite,
        big,
        code,
        little,
      } = req.body;
      let { DeviceMoreInf } = req.body;
      const img = req.files;
      console.log(DeviceMoreInf);
      const DeviceMoreInfoIdData = await DeviceMoreInfoId.findAll();
      JSON.parse(DeviceMoreInf).map(async (i) => {
        try {
          DeviceMoreInfoIdData.filter(
            (y) =>
              y.dataValues.name.toLowerCase().trim() ===
              i.title.toLowerCase().trim()
          ).length === 0
            ? await DeviceMoreInfoId.create({ name: i.title.trim() })
            : null;
          DeviceMoreInfoIdData.filter(
            (y) =>
              y.dataValues.name.toLowerCase().trim() ===
              i.description.toLowerCase().trim()
          ).length === 0
            ? await DeviceMoreInfoId.create({ name: i.description.trim() })
            : null;
        } catch (error) {
          console.log(error);
        }
      });

      const device = await Device.create({
        name,
        price,
        typeId,
        titleTypeId,
        favourite,
        code
      });
      await DeviceDescription.create({
        big,
        little,
        deviceId: device.id,
      });
      if (DeviceMoreInf) {
        DeviceMoreInf = JSON.parse(DeviceMoreInf);

        DeviceMoreInf.map((i) => {
          DeviceMoreInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }
      for (const key in img) {
        let fileName = uuid.v4() + ".jpg";

        img[key].mv(path.resolve(__dirname, "..", "files", "images", fileName));
        await DeviceImg.create({
          name: fileName,
          deviceId: device.id,
        });
      }

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let {
        typeId,
        titleTypeId,
        subTypeId,
        limit,
        page,
        favourite,
        minPrice,
        maxPrice,
        query,
        sort,
        newProducts
      } = req.query;
      let filterArr = [];
      for (const key in req.query) {
        if (key.includes("filter_")) {
          let sliceKey = key.slice(7);
          filterArr.push({ [sliceKey]: req.query[key] });
        }
      }
      page = page || 1;
      limit = limit || 5;
      // let offset = page * limit - limit;

      let devices;
      let deviceInfoTitle = [];
      let deviceInfoDescription = [];
      const deviceFilteerItems = (arr)=>{
        if (arr.length > 0){
          let arrTitle = [];
          let arrDescription = [];
          arr?.map((i) => {
            i.more_info?.map((j) => {
              let newElem = { id: j.id, title: j.title };
              const bool =
                arrTitle.filter((obj) => {
                  return (
                    obj?.title?.trim().toLowerCase() ===
                    j?.title?.trim().toLowerCase()
                  );
                }).length === 0;
              if (bool) {
                arrTitle.push(newElem);
                deviceInfoTitle = [...deviceInfoTitle, newElem]
              }
            });
          });
          arr?.map((i) => {
            i.more_info?.map((j) => {
              let newElem = {
                id: j.id,
                title: j.title,
                description: j.description,
              };
              const bool =
                arrDescription.filter((obj) => {
                  return (
                    obj?.description?.toLowerCase().trim() ===
                    j?.description?.toLowerCase().trim()
                  );
                }).length === 0;
              if (bool) {
                arrDescription.push(newElem);
                deviceInfoDescription = [...deviceInfoDescription, newElem]
              }
            });
          });
        } else {
          deviceInfoTitle = [];
          deviceInfoDescription = [];
        }
      }
      if ( !typeId && !titleTypeId && !subTypeId && !favourite && !query) {
        devices = await Device.findAll({
          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: DeviceDescription, as: "device_description" },
            { model: DeviceMoreInfo, as: "more_info" },
          ],
        });

      }

      // if (!brandId && !typeId && !titleTypeId && !subTypeId && !favourite) {
      //   devices = await Device.findAndCountAll({
      //     limit,
      //     offset,
      //     include: [
      //       {
      //         model: SubDevice,
      //         as: "subDevice",
      //         include: [{ model: DeviceInfo, as: "info" }],
      //       },
      //       { model: DeviceImg, as: "deviceImg" },
      //       { model: DeviceDescription, as: "device_description" },
      //       { model: DeviceMoreInfo, as: "more_info" },
      //     ],
      //     group: ["device.id"],
      //   });
      // }

      if (query) {
        devices = await Device.findAll({
          where: { ...devices, name: { [Op.iLike]: `%${query}%` } },
          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: Rating, as: "rating" },
            { model: DeviceDescription, as: "device_description" },
            { model: DeviceMoreInfo, as: "more_info" },
          ],
          // limit,
          // offset,
          // group: ["device.id"],
        });
        // return res.json(devices);
      }

      if (newProducts) {

        devices = await Device.findAll({
          limit: 10,
          order: [ [ 'createdAt', 'DESC' ]],
          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: Rating, as: "rating" },
            { model: DeviceDescription, as: "device_description" },
            { model: DeviceMoreInfo, as: "more_info" },
          ],
        });
      }

      if (favourite) {
        devices = await Device.findAll({
          where: { favourite: true },
          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: Rating, as: "rating" },
          ],
          // limit,
          // offset,
        });
      }

      if ( typeId && maxPrice) {
        devices = await Device.findAll({
          where: {
            typeId,
            price: {
              [Op.gte]: minPrice,
              [Op.lte]: maxPrice,
            },
          },

          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: Rating, as: "rating" },
            { model: DeviceDescription, as: "device_description" },
            { model: DeviceMoreInfo, as: "more_info" },
          ],
          // limit,
          // offset,
          // group: ["device.id"],
        });
      }

      if ( typeId && !maxPrice) {
        devices = await Device.findAll({
          where: {
            typeId,
          },

          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: Rating, as: "rating" },
            { model: DeviceDescription, as: "device_description" },
            { model: DeviceMoreInfo, as: "more_info" },
          ],
          // limit,
          // offset,
          // group: ["device.id"],
        });
      }
      // if (brandId && typeId && !maxPrice) {
      //   devices = await Device.findAll({
      //     where: { typeId, brandId },
      //     include: [
      //       {
      //         model: SubDevice,
      //         as: "subDevice",
      //         include: [{ model: DeviceInfo, as: "info" }],
      //       },
      //       { model: DeviceImg, as: "deviceImg" },
      //       { model: Rating, as: "rating" },
      //       { model: DeviceDescription, as: "device_description" },
      //       { model: DeviceMoreInfo, as: "more_info" },
      //     ],
      //     // limit,
      //     // offset,
      //     // group: ["device.id"],
      //   });
      // }
      // if (brandId && typeId && maxPrice) {
      //   devices = await Device.findAll({
      //     where: {
      //       typeId,
      //       brandId,
      //       price: {
      //         [Op.gte]: minPrice,
      //         [Op.lte]: maxPrice,
      //       },
      //     },
      //     include: [
      //       {
      //         model: SubDevice,
      //         as: "subDevice",
      //         include: [{ model: DeviceInfo, as: "info" }],
      //       },
      //       { model: DeviceImg, as: "deviceImg" },
      //       { model: Rating, as: "rating" },
      //       { model: DeviceDescription, as: "device_description" },
      //       { model: DeviceMoreInfo, as: "more_info" },
      //     ],
      //     // limit,
      //     // offset,
      //     // group: ["device.id"],
      //   });
      // }
      // if (brandId && titleTypeId && maxPrice) {
      //   devices = await Device.findAll({
      //     where: { titleTypeId, brandId },
      //     include: [
      //       {
      //         model: SubDevice,
      //         as: "subDevice",
      //         include: [{ model: DeviceInfo, as: "info" }],
      //       },
      //       { model: DeviceImg, as: "deviceImg" },
      //       { model: Rating, as: "rating" },
      //       { model: DeviceDescription, as: "device_description" },
      //       { model: DeviceMoreInfo, as: "more_info" },
      //     ],
      //     // limit,
      //     // offset,
      //     // group: ["device.id"],
      //   });
      // }
      if ( titleTypeId && maxPrice) {
        devices = await Device.findAll({
          where: { titleTypeId },
          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: Rating, as: "rating" },
            { model: DeviceDescription, as: "device_description" },
            { model: DeviceMoreInfo, as: "more_info" },
          ],
          // limit,
          // offset,
          // group: ["device.id"],
        });
      }
      if ( titleTypeId && !maxPrice) {
        devices = await Device.findAll({
          where: { titleTypeId },
          include: [
            {
              model: SubDevice,
              as: "subDevice",
              include: [{ model: DeviceInfo, as: "info" }],
            },
            { model: DeviceImg, as: "deviceImg" },
            { model: Rating, as: "rating" },
            { model: DeviceDescription, as: "device_description" },
            { model: DeviceMoreInfo, as: "more_info" },
          ],
          // limit,
          // offset,
          // group: ["device.id"],
        });
      }
      // if (brandId && titleTypeId && maxPrice) {
      //   devices = await Device.findAll({
      //     where: {
      //       titleTypeId,
      //       brandId,
      //       price: {
      //         [Op.gte]: minPrice,
      //         [Op.lte]: maxPrice,
      //       },
      //     },
      //     include: [
      //       {
      //         model: SubDevice,
      //         as: "subDevice",
      //         include: [{ model: DeviceInfo, as: "info" }],
      //       },
      //       { model: DeviceImg, as: "deviceImg" },
      //       { model: Rating, as: "rating" },
      //       { model: DeviceDescription, as: "device_description" },
      //       { model: DeviceMoreInfo, as: "more_info" },
      //     ],
      //     // limit,
      //     // offset,
      //     // group: ["device.id"],
      //   });
      // }
      // if (!brandId && subTypeId && !maxPrice) {
      //   devices = await Device.findAll({
      //     where: { subTypeId },
      //     include: [
      //       {
      //         model: SubDevice,
      //         as: "subDevice",
      //         include: [{ model: DeviceInfo, as: "info" }],
      //       },
      //       { model: DeviceImg, as: "deviceImg" },
      //       { model: Rating, as: "rating" },
      //       { model: DeviceDescription, as: "device_description" },
      //       { model: DeviceMoreInfo, as: "more_info" },
      //     ],
      //     // limit,
      //     // offset,
      //     // group: ["device.id"],
      //   });
      // }
      // if (!brandId && subTypeId && maxPrice) {
      //   devices = await Device.findAll({
      //     where: { subTypeId },
      //     include: [
      //       {
      //         model: SubDevice,
      //         as: "subDevice",
      //         include: [{ model: DeviceInfo, as: "info" }],
      //       },
      //       { model: DeviceImg, as: "deviceImg" },
      //       { model: Rating, as: "rating" },
      //       { model: DeviceDescription, as: "device_description" },
      //       { model: DeviceMoreInfo, as: "more_info" },
      //     ],
      //     // limit,
      //     // offset,
      //     // group: ["device.id"],
      //   });
      // }
      // if (brandId && subTypeId && maxPrice) {
      //   devices = await Device.findAll({
      //     where: {
      //       subTypeId,
      //       brandId,
      //       price: {
      //         [Op.gte]: minPrice,
      //         [Op.lte]: maxPrice,
      //       },
      //     },
      //     include: [
      //       {
      //         model: SubDevice,
      //         as: "subDevice",
      //         include: [{ model: DeviceInfo, as: "info" }],
      //       },
      //       { model: DeviceImg, as: "deviceImg" },
      //       { model: Rating, as: "rating" },
      //       { model: DeviceDescription, as: "device_description" },
      //       { model: DeviceMoreInfo, as: "more_info" },
      //     ],
      //     // limit,
      //     // offset,
      //     // group: ["device.id"],
      //   });
      // }
      let result = devices
      if (sort === "true") {
        result = [...result].sort((a, b) => a.price - b.price)
      } else {
        result = [...result].sort((a, b) => b.price - a.price)
      } 
      devices = {}
      deviceFilteerItems(result)
      devices.rows = result
      devices.count = result.length
      devices.deviceInfoDescription = deviceInfoDescription;
      devices.deviceInfoTitle = deviceInfoTitle;

      const filteerBodyFunc = (element, key) => {
        let bool = false;
        for (let index = 0; index < key.length; index++) {
          if (element.description === key[index]) {
            bool = true;
            break;
          }
        }
        return bool;
      };
      const filteerBody = (device) => {
        let bool = false;

        for (let index = 0; index < device.more_info.length; index++) {
          const element = device.more_info[index];
          for (const key in filterObj) {
            if (
              element.title === key &&
              filteerBodyFunc(element, filterObj[key])
            ) {
              bool = true;
              break;
            }
          }
        }
        return bool;
      };
      let filterObj = {};
      filterArr.map((i) => {
        for (const key in i) {
          filterObj[key] = i[key].split("%");
        }
      });

      if (Object.keys(filterObj).length === 0) {
        (favourite  || newProducts) ? null : devices.rows = devices.rows.slice((page - 1 ) * limit, page * limit)
        return res.json(devices);
      } else {
        const devTest = devices.rows.filter((device) => {
          return filteerBody(device);
        });
        // if (sort) {
        //   devTest = [...devTest].sort((a, b) => a.price - b.price)
        // } else {
        //   devTest = [...devTest].sort((a, b) => b.price - a.price)
        // } 
        devices.rows = devTest;
        devices.count = devices.rows.length
        devices.rows = devices.rows.slice((page - 1 ) * limit, page * limit)
        return res.json(devices);
      }
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [
        {
          model: SubDevice,
          as: "subDevice",
          include: [{ model: DeviceInfo, as: "info" }],
        },
        { model: DeviceImg, as: "deviceImg" },
        { model: Rating, as: "rating" },
        { model: DeviceDescription, as: "device_description" },
        { model: DeviceMoreInfo, as: "more_info" },
      ],
    });
    return res.json(device);
  }

  async update(req, res) {
    const device = req.body;
    let id = device.id;
    let img = req.files;

    if (img) {
      img = img.img;
      let imgName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "files", "images", imgName));
      device.img = imgName;
    }

    if (!device.id) {
      res.status(400).json({ message: "ID yok" });
    }

    const updatedPost = await Device.update(device, { where: { id } });

    return res.json(updatedPost);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const device = await Device.destroy({
        where: { id },
        include: [
          {
            model: SubDevice,
            as: "subDevice",
            include: [{ model: DeviceInfo, as: "info" }],
          },
          { model: DeviceImg, as: "deviceImg" },
          { model: Rating, as: "rating" },
          { model: DeviceDescription, as: "device_description" },
          { model: DeviceMoreInfo, as: "more_info" },
        ],
      });
      SubDevice.destroy({
        where: { deviceId: id },
        include: [{ model: DeviceInfo, as: "info" }],
      });
      await DeviceInfo.destroy({ where: { subDeviceId: null } });
      await BasketDevice.destroy({ where: { deviceId: id } });
      const deviceImg = await DeviceImg.findAll({ where: { deviceId: null } });
      deviceImg.map((i) => {
        fs.unlink(
          path.resolve(__dirname, "..", "files", "images", i.name),
          function (err) {
            if (err) {
              console.log(err);
            } 
          }
        );
        i.destroy();
      });
      return res.json(device);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new DeviceController();
