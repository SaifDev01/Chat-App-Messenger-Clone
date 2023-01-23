const express = require("express")
const router = express.Router()
const { newChatRoom, getChatRoom } = require("../controllers/chatRoomController")
const { isAuthenticated } = require("../middleWare/auth")
router.route("/chatRoom").post(isAuthenticated,newChatRoom)
router.route("/getChatRoom").get(isAuthenticated,getChatRoom)


module.exports = router