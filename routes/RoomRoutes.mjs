import express from "express"
import * as chat from "../controllers/ChatRoom.mjs"
import * as token from "../middlewares/Auth.mjs"

const router = express.Router()

router.post("/chatRoom",token.validateToken,chat.chatfunc)
router.get("/Rooms",chat.getAllRooms)
router.post("/joinRoom",token.validateToken,chat.joinRoom)
router.post("/leaveRoom",token.validateToken,chat.leaveRoom)
router.post("/switchableAI",token.validateToken,chat.AutoswitchableAI)

export default router