import express from 'express'
import *  as user from"../controllers/userController.mjs"
import * as token from "../middlewares/Auth.mjs"

const router = express.Router()


router.get("/test",user.testfunc)
router.post("/signup",user.signup)
router.post("/login",user.login)


export default router
