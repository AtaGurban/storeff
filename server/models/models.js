const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING},  
    email: {type:DataTypes.STRING, unique: true},
    password: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue: 'USER'},
})
const Basket = sequelize.define('basket', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
}) 

const BasketDevice = sequelize.define('basket_device', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    productPrice: {type:DataTypes.INTEGER},

})

const Favourite = sequelize.define('favourite', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const FavouriteDevice = sequelize.define('favourite_device', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
}) 

const Device = sequelize.define('device', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, unique:true, allowNull: false},
    favourite: {type: DataTypes.BOOLEAN, defaultValue: false},  
    price: {type: DataTypes.INTEGER, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false}, 
    imgOne: {type: DataTypes.STRING, unique:true, allowNull: false},
    imgTwo: {type: DataTypes.STRING, unique:true, allowNull: false}, 
})

const Category = sequelize.define('category', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const TitleType = sequelize.define('title_type', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
})

// const SubType = sequelize.define('sub_type', {
//     id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique:true, allowNull: false},
// })

// const Brand = sequelize.define('brand', {
//     id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type:DataTypes.STRING, unique:true, allowNull: false},
//     img: {type: DataTypes.STRING, unique:true, allowNull: false},  
// })

const Banner = sequelize.define('banner', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING, allowNull: false}, 
    img: {type: DataTypes.STRING, unique:true, allowNull: false},  
})

const Rating = sequelize.define('rating', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type:DataTypes.INTEGER, defaultValue: 0},
    comment: {type:DataTypes.STRING, defaultValue: ''},
    count: {type:DataTypes.REAL, defaultValue: 0} 
})
const DeviceDescription = sequelize.define('device_description', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    little: {type:DataTypes.TEXT, allowNull: false},
    big: {type:DataTypes.TEXT, allowNull: false},
})

const SubDevice = sequelize.define('sub_device', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceImg = sequelize.define('device_img', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false}
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type:DataTypes.STRING, allowNull:false},
    description: {type:DataTypes.STRING, allowNull:false}
})

const DeviceMoreInfo = sequelize.define('device_more_info', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type:DataTypes.STRING, allowNull:false},
    description: {type:DataTypes.STRING, allowNull:false}
})

const DeviceMoreInfoId = sequelize.define('device_more_info_id', {
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING, allowNull:false}
})



User.hasOne(Basket)
Basket.belongsTo(User)

User.hasOne(Favourite)
Favourite.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Favourite.hasMany(FavouriteDevice)
FavouriteDevice.belongsTo(Favourite)

Type.hasOne(Category)
Category.belongsTo(Type)

TitleType.hasOne(Category)
Category.belongsTo(TitleType)

// SubType.hasOne(Category)
// Category.belongsTo(SubType)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(TitleType)
TitleType.belongsTo(Type)
 
// TitleType.hasMany(SubType)
// SubType.belongsTo(TitleType)

Type.hasMany(Device)
Device.belongsTo(Type)

// SubType.hasMany(Device)  
// Device.belongsTo(SubType)


TitleType.hasMany(Device)
Device.belongsTo(TitleType)


Device.hasMany(Rating, {as: 'rating'})
Rating.belongsTo(Device)

Device.hasMany(DeviceDescription, {as: 'device_description'})
DeviceDescription.belongsTo(Device)

Device.hasMany(DeviceImg, {as: 'deviceImg'})
DeviceImg.belongsTo(Device)

Device.hasMany(SubDevice, {as: 'subDevice'})
SubDevice.belongsTo(Device)
 
Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(FavouriteDevice)
FavouriteDevice.belongsTo(Device)

SubDevice.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(SubDevice)

Device.hasMany(DeviceMoreInfo, {as: 'more_info'})
DeviceMoreInfo.belongsTo(Device) 
  




module.exports = {User, Category, DeviceMoreInfo, DeviceMoreInfoId, DeviceDescription, DeviceImg, Basket, SubDevice, Banner, BasketDevice, Device, DeviceInfo, Type,  TitleType, Rating}