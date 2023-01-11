const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const multer = require("multer")
const helmet = require("helmet")
const morgan = require("morgan")
const path = require("path")
const {fileURLToPath} = require("url")
const {register} = require("./controllers/auth")

/*Configs*/

//const __filename = fileURLToPath(import.meta.url)
//const __dirname = path.dirname(__filename)
dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))) //Set directory of assets

/*Configure File Storage*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

/*Routes*/
app.post("/auth/register", upload.single("picture", register)) //Api route to register, upload picture middleware and then call controller

/*Configure Mongoose*/

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
    })
    .catch((err) => console.log(`${err} did not connect`))
