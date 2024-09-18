import express from "express"
import * as chat from "../controllers/ChatRoom.mjs"
import * as token from "../middlewares/Auth.mjs"

const router = express.Router()

router.post("/chatRoom",token.validateToken,chat.chatfunc)

export default router