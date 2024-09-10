import * as gemeni from "../utils/gemini_ai.mjs"
import * as openai from "../utils/gpt_ai.mjs"


export const gemeni_ai = async (req,res)=>{
    try {
        let data = req.body
        const result = await gemeni.run_gemeni(data)
        return res.status(200).json({message:result})
    } catch (error) {
        return res.status(500).json({message:"something went wrong"})
    }
}

export const open_ai = async (req,res)=>{
    try {
        const data = req.body
        const result = await openai.gptfunc(data)
        return res.status(200).json({message : result})
    } catch (error) {
        return res.status(500).json({message:"something went wrong"}) 
    }
}