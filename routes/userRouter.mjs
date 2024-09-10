import express from 'express'
import *  as user from"../controllers/userController.mjs"
import * as gemeni from "../controllers/gemeni.mjs"
import * as token from "../middlewares/Auth.mjs"

const router = express.Router()


router.get("/test",user.testfunc)
router.get("/dash",token.validateToken,user.Dashboard)
router.post("/signup",user.signup)
router.post("/login",user.login)
router.post("/gemeni_chat",gemeni.gemeni_ai)
router.post("/openAi_chat",gemeni.open_ai)




export default router
