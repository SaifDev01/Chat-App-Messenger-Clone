const express = require("express")
const { addMessage, allMessages } = require("../controllers/chatController")
const { isAuthenticated } = require("../middleWare/auth")
const router = express.Router()

router.route("/addMessage").post(isAuthenticated,addMessage)   
router.route("/messages/:id").get(isAuthenticated,allMessages)

module.exports = router