const express = require("express")
const cors = require("cors")

const app = express()
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleWare/error")
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const score = require("./routes/scoreRoute")
const bodyParser = require("body-parser")
const order = require("./routes/orderRoute")
const chatroom = require("./routes/chatRoomRoute")
const address = require("./routes/addressRoute")
const chat = require("./routes/chatRoute")
const { log } = require("console")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(cookieParser())
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", score)
app.use("/api/v1",order)
app.use("/api/v1",address)
app.use("/api/v1",chatroom)
app.use("/api/v1",chat)
app.use(errorMiddleware)






module.exports = app; 