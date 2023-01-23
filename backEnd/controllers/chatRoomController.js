const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleWare/asyncErrors")
const ChatRoom = require("../models/chatRoomModel")


exports.newChatRoom = catchAsyncError(async( req,res,next)=>{
    console.log(req.user.id);
    const room = await ChatRoom.create({
        members :[
            req.user.id , req.body.receiverId
        ]
    })
    if(!room){
        return next(new ErrorHandler("Conversation Can not be Created" , 400))
    }
    res.status(200).json({
        success : true,
        room
    })
})
exports.getChatRoom = catchAsyncError(async(req,res,next)=>{
    const chatRoom = await ChatRoom.find({
        members :{
            $in:[req.user.id]
        }
    })
    if(!chatRoom){
        return next(new ErrorHandler("Conversation Does't Exist" , 400))
    }
    res.status(200).json({
        success : true,
        chatRoom
    })
    

})