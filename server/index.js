require('dotenv').config();
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 5000;
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index');
const ErrorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware');
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'files', 'images')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(ErrorHandlingMiddleware)

const start = async ()=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()

