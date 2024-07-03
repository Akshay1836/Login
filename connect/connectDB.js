const mongoose=require("mongoose");

const connectDB=async()=>{
        mongoose.connect(process.env.CONNECTION_STRING);
        console.log("db connected")
}

module.exports=connectDB;