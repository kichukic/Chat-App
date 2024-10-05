import dotenv from "dotenv"
import roomModel from "../models/chatModel.mjs"
import messageModel from "../models/messageModel.mjs"
import { generateRandomString } from "../utils/emailValidation.mjs"
import * as gemeni from "../utils/gemini_ai.mjs"
import * as openai from "../utils/gpt_ai.mjs"
dotenv.config()




export const getAllRooms =async(req,res)=>{
  try {
    const Rooms = await roomModel.find()
    const roomData = Rooms.map(room => ({
      RoomId:room.roomId,
      RoomName:room.roomName,
      members:room.Members.length
    }))
   return res.status(200).json({Rooms:roomData})
  } catch (error) {
    return res.status(500).json({error : "internal server error"})
  }
}

export const chatfunc= async (req,res)=>{
  try {
    const {roomName} = req.body
    const user = req.user.user
    const roomId = await generateRandomString(20)
    let userRoomExists = await roomModel.findOne({CreatedUser:user})
    if(!roomName){
        return res.status(401).json({message : "please provide a Room Name"})
    }else if(userRoomExists){
      return res.status(200).json({message : `a room already created by this user ${user}`})
    }else{
      await  roomModel.create({
        roomId:roomId,
        roomName:roomName,
        CreatedUser:user ,
        Admin:user
    })
    return res.status(200).json({message : `room ${roomName} created sucessfully`})
    }
  } catch (error) {
    res.status(500).json({message:"some error occured in the server"})
  }
}

export const joinRoom = async(req,res)=>{
  try {
      const user = req.user.user
      const {RoomId}= req.body
      const room = await roomModel.findOne({roomId:RoomId})
      if(room.Members.includes(user)){
        return res.status(302).json({message : `${user} is already on the chat room`})
      }else{
        await roomModel.updateOne({roomId:RoomId},{$addToSet:{Members:user}})
        return res.status(200).json({message: `user ${user} is joined the room successfully`})
      }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"No room found"})
  }
}


export const leaveRoom = async(req,res)=>{
  try {
    const user = req.user.user
    const {RoomId}= req.body
    const room = await roomModel.findOne({roomId:RoomId})
    if(!room){
      return res.status(400).json({message:"no room found with this id"})
    }else if(!room.Members.includes(user)){
      return res.status(404).json({message:`user ${user} has not been found on this chat room`})
    }else{
      await roomModel.updateOne({roomId:RoomId},{$pull:{Members:user}})
      return res.status(200).json({message : `user ${user} has been removed from chat room`})
    }
  } catch (error) {
    return res.status(500).json({message:"internal server error"})
  }
}

export const AutoswitchableAI =async(req,res)=>{ 
try {
  const{data,conversationHistory}= req.body
  conversationHistory.push(data)
  const feedback = `theres two persons user and bot continue this chat efficiently: ${conversationHistory.map(msg => `${msg.sender}: ${msg.text}`).join(' | ')}`;
  console.log(">>>>>>",feedback)
  const user = req.user.user
  let botResponse = ''
  const result = await openai.gptfunc(feedback)
if(result){
  botResponse = result.text
  console.log("the consled data is >>>>>>>>>>>",botResponse)
  await messageModel.create({sender:user,message:botResponse})
  return res.status(200).json({engine_openAI: botResponse})
}else{
  const result = await gemeni.run_gemeni(data)
  return res.status(200).json({engine_gemeni:result.text})
}
} catch (error) {
  console.log(error)
  return res.status(500).json({message:"internal server error"})
}
}
