import { ChatGPTAPI } from "chatgpt";
import dotenv from "dotenv"
dotenv.config()



export const gptfunc = async (data)=>{
 try {
       const gpt = await new ChatGPTAPI({
           apiKey:process.env.openai_api_key
       })
       const res = await gpt.sendMessage(data)
        return res
 } catch (error) {
    console.log(error.message)
    return error.message
 }
    }