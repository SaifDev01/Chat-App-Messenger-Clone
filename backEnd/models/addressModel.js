const mongoose = require("mongoose")
const User = require("../models/userModel")

const addressSchema = new mongoose.Schema({
        address:{type:String , required : true}
    })
module.exports = mongoose.model("Address", addressSchema)



