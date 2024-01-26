import * as utils from "../utils/emailValidation.mjs"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import userModel from "../models/usermodel.mjs"

dotenv.config()

export const testfunc = (req,res)=>{
res.render('signup.ejs')
}



export const Dashboard = (req,res)=>{
  try {
    res.render('index.ejs')
  } catch (error) {
    console.log(error)
  }
}

export const signup = async (req,res)=>{
 try {
    const {name,email,password,confirmPassword} = req.body
    console.log("the req body is  >>>>>",req.body)
    if(password !== confirmPassword){
        return res.status(408).json({message:"passwords don't match"})
    }
    if(!utils.EmailValidation(email)){
        return res.status(400).json({message:"Invalid Email"})
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = await bcrypt.hashSync(password,salt)
    await userModel.create({
        name:name,
        email:email,
        password:hash
    })
    return res.status(200).json({message:`account for ${name} created successfully`})
 } catch (error) {
    return res.status(500).json({message:"something went wrong"})
 }
}


export const login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user  = await userModel.findOne({email:email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }else if(user){
         bcrypt.compare(password,user.password,(err,data)=>{
            if(data){
                jwt.sign({user:user.email},process.env.secrect ,{expiresIn: "15m"},(err,token)=>{
                    if(token){
                        console.log("the token is  >>>>>",token)
                        return res.status(200).json({message:"login successful",token:token})
                    }else{
                        return res.status(500).json({message:"something went wrong",err})
                    }
                })
            }else{
                return res.status(400).json({message:"wrong password",err})
            }
         })
        }
    } catch (error) {
        return res.status(500).json({message:"something went wrong"})
    }
}