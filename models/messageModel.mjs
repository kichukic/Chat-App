import mongoose from "mongoose";

const message = new mongoose.Schema({
    sender:{
        type : String,
        required : true
    },
message:{
    type:String,
    required:true
},
    timestamp:{
        type: Date,
        default:Date.now()
    }
})


const messageModel = mongoose.model("Conversations",message)

export default messageModel