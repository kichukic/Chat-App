import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    gender:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    createdAt :{
        type : Date,
        default : Date.now
    }

})


const userModel = mongoose.model("users",userSchema)

export default userModel