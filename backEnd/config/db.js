const mongoose = require("mongoose")

const con = ()=>{
    mongoose.set('strictQuery', true)
    mongoose.connect("mongodb://localhost:27017/Backend_Score").then((data)=>{
        console.log(`MongoDB connected with Server Host ${data.connection.host}`);
    })
}

module.exports = con;


