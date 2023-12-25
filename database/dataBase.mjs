import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const mongo_url = process.env.mongo_uri


mongoose.connect(mongo_url)
const database = mongoose.connection


database.on('open', () => {
    console.log('Connected to Database')
})
database.on('error', () => {
    console.log('Connection Failed')
})


export default database


