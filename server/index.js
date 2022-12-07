require('dotenv').config();
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 4000;
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index');
const ErrorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware');
const path = require('path')
const app = express()
const fs = require("fs");   
const http = require("http");
// const https = require("https");
// const privateKey = fs.readFileSync(
//   "/etc/letsencrypt/live/tmcoder.store/privkey.pem",
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   "/etc/letsencrypt/live/tmcoder.store/cert.pem",
//   "utf8" 
// );
// const ca = fs.readFileSync(
//   "/etc/letsencrypt/live/tmcoder.store/chain.pem",
//   "utf8" 
// );

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };

app.use(cors())
app.use(express.json())
app.use('/api',express.static(path.resolve(__dirname, 'files', 'images')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(ErrorHandlingMiddleware) 

const start = async ()=>{
    const httpServer = http.createServer(app);
    // const httpsServer = https.createServer(credentials, app);
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        httpServer.listen(5001, () => console.log(`server started on port 4000`));
        // httpsServer.listen(5000, () => console.log(`server started on port 5000`));
        // app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()

