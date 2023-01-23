const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleWare/asyncErrors")
const sendToken = require("../utils/jwtToken")
const Message = require("../models/chatModel")
exports.addMessage = catchAsyncError(async (req,res,next)=>{
    const {conversationId, text} = req.body
    const newMessage = await Message.create({
        conversationId,
        sender: req.user.id,
        text,
    }) 
    
    if(!newMessage){
        return next(new ErrorHandler("Message Can not be Sent" , 400))
    }
    res.status(200).json({
        success: true,
        newMessage
        // message : "Message Sent Successfully"
    })
}) 

exports.allMessages = catchAsyncError(async(req,res,next)=>{
    const messages = await Message.find({
        conversationId : req.params.id
    })
    if(!messages){
        return next(new ErrorHandler("No Message Exists" , 400))
    }
    res.status(200).json({
        success: true, 
        messages
    })
})