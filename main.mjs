import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import database from './database/dataBase.mjs'
import bodyParser from 'body-parser'
import { Server } from "socket.io";
import routes from "./routes/userRouter.mjs"
import socketLogic from "./socket.io/socketLogic.mjs"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
dotenv.config()



let port = process.env.port || 3000

app.use(express.static(join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use(morgan('combined'))
app.use(bodyParser.json())


app.use("/api",routes)


const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
const io = new Server(server)
socketLogic(io)




