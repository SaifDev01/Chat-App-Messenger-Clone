const mongoose = require("mongoose")
const chatRoomSchema = new mongoose.Schema({
   members:{
    type: Array,
   }
   
} ,{
    timestamps : true
})

module.exports = mongoose.model("chatRoom", chatRoomSchema)