import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import database from './database/dataBase.mjs'
import bodyParser from 'body-parser'
import routes from "./routes/userRouter.mjs"
import ChatRoute from "./routes/RoomRoutes.mjs"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
dotenv.config()



let port = process.env.port || 3000
app.use(cors());
app.use(express.static(join(__dirname, 'public')))
app.set('view engine', 'ejs')
//app.use(morgan('combined'))
app.use(bodyParser.json())


app.use("/api",routes)
app.use("/api/chat",ChatRoute)


const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

