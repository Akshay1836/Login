const express=require('express');
const app=express();
require('dotenv').config();
const cookieParser=require('cookie-parser')
const connectDB=require('./connect/connectDB')
const port=process.env.PORT || 8001;
const authenticateRouter=require('./routes/authenticateRouter')
const errorHandler=require('./middlewares/errorHandlers')

app.use(express.json());
app.use(cookieParser())
app.get('/',(req,res)=>{
        res.send("welcome to express");
})
app.use('/auth',authenticateRouter);
app.use(errorHandler);

const start=async()=>{
       try {
        await connectDB();
        app.listen(port,(err)=>{
                if(!err){
                        console.log('app listening on '+ port);
                }else{
                        console.log("error occured")
                }
        })
       } catch (error) {
        console.log("error occured"+error);
       }
}

start();
