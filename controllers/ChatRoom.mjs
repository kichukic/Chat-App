import dotenv from "dotenv"
import roomModel from "../models/chatModel.mjs"
import { generateRandomString } from "../utils/emailValidation.mjs"
dotenv.config()


export const chatfunc= async (req,res)=>{
  try {
    console.log("call received")
    const {roomName} = req.body
    const user = req.user.user
    const roomId = await generateRandomString(20)
    let userRoomExists = await roomModel.findOne({CreatedUser:user})
    if(!roomName){
        return res.status(401).json({message : "please provide a Room Name"})
    }else if(userRoomExists){
      return res.status(200).json({message : "a room already created by this user"})
    }else{
      await  roomModel.create({
        roomId:roomId,
        roomName:roomName,
        CreatedUser:user 
    })
    return res.status(200).json({message : `room ${roomName} created sucessfully`})
    }
  } catch (error) {
    res.status(500).json({message:"some error occured in the server"})
  }
}
