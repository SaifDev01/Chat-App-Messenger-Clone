const User = require("../backEnd/models/userModel")
const catchAsyncError = require("../backEnd/middleWare/asyncErrors")

const dotenv = require("dotenv")
const con = require("../backEnd/config/db")

dotenv.config({path:"./backEnd/config/config.env"})
const io  = require("socket.io")(8900, {
    cors:{
        origin: "http://localhost:3000"
    }
})
let user = []
con()
const addUser = (userId , socketId)=>{
    !user.some(user=>user.userId===userId)&&
    user.push({userId,socketId})
}
const removeUser = (socketId)=>{
    user = user.filter(user=>user.socketId  !==socketId)
}
const getUser = (userId)=>{
    return user.find(user=>user.userId===userId)
}
const getData =  async()=>{
    // console.log(a);
    const user = await User.find()
    if(!user){
        return "fucked up"
    }
    return user
    
    
}
// console.log("saif");
// 
io.on("connection",async (socket)=>{
    // getData("you").then(user=>console.log(user))
    // console.log(getData());
     const w = await getData();
     console.log(w,"<===== wow");
    console.log("a user Connected");
    socket.on("addUser", (userId)=>{
        addUser(userId, socket.id)
        io.emit("getUsers", user)
    })

    //send and get message 
    socket.on("sendMessage",({senderId , receiverId, text})=>{
        const user = getUser(receiverId)
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        })
    })


    //
    socket.on("disconnect", ()=>{
        console.log("A User Disconnected")
        removeUser(socket.id)
        // io.emit("getUsers", user)
    })
})