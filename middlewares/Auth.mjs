import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()



export const validateToken=(req,res,next)=>{
    try {
        let token = req.headers.authorization.split(" ")[1]
        if(token){
            jwt.verify(token,process.env.secrect,(err,data)=>{
                if(data){
                    next()
                }else{
                    return res.status(400).json({message:"invalid token",err})
                }
            })
        }else{
            return res.status(400).json({message:"no token provided"})
        }
    } catch (error) {
        return res.status(500).json({message:"something went wrong"})
    }
}