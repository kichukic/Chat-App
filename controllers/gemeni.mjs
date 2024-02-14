import * as gemeni from "../utils/gemini_ai.mjs"


export const gemeni_ai = async (req,res)=>{
    try {
        let data = req.body
        const result = await gemeni.run_gemeni(data)
        return res.status(200).json({message:result})
    } catch (error) {
        return res.status(500).json({message:"something went wrong"})
    }
}
