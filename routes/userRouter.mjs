import express from 'express'
import *  as user from"../controllers/userController.mjs"

const router = express.Router()


router.get("/test",user.testfunc)



export default router
