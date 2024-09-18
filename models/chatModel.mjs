import mongoose from "mongoose";

const ModelRoom = new mongoose.Schema({
    roomId:{
        type: String,
        required : true
    },
    roomName:{
        type :String,
        required : true
    },
    createdAt :{
        type : Date,
        default : Date.now()
    },
    CreatedUser :{
        type:String,
        required:true
    },
    Messages:{
        type : String,
        required : false
    }
})


const roomModel = mongoose.model("ROOMS",ModelRoom)

export default roomModel